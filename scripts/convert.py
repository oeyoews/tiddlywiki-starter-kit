#!/usr/bin/env python3

"""Migrate TiddlyWiki5 WikiText files to Markdown files.

This script creates a .md + .md.meta file for every given .tid file.
System tiddlers and other special tiddlers are skipped because they
don't work in TiddlyWiki when migrated to Markdown. Tiddlers using
macros get converted unlike tiddlers defining macros. Tiddlers
containing tables are skipped by default because Markdown tables are
very limited. If your tables are simple anyway or you just don't care
about losing table features (two header rows, captions, cell alignment,
cell merging, ...), just use the --tables flag.
"""

__version__ = '0.3.0'
__author__ = 'Max Schillinger'
__email__ = 'maxschillinger@web.de'

import sys
import os
import re
import argparse
import subprocess
import urllib.parse
from pathlib import Path
from typing import TextIO


re_special_tag = re.compile(r'^tags:.*\$:/tags/')
re_special_title = re.compile(r'^title: ?\$:/')
re_external_link = re.compile(r'\[\[(https?://[^\]]+)\]\]')
re_named_external_link = re.compile(r'\[\[([^|]+)\|([^\]]+)\]\]')
re_internal_link = re.compile(r'\[\[([^|]+?)\]\]')
re_image = re.compile(r'\[img( width=(\d+))? ?\[([^]]+?)\]\]')
re_url = re.compile(r'(^|[^("<])(https?://[\w#/@:._?%=+-]+)($|[^)">])')
re_bold = re.compile(r"(\s|^)''([^']+)''")
re_italic = re.compile(r"(\s|\(|^)//([^/]+)//")
re_bold_italic = re.compile(r"(\s|^)''//([^/']+)//''")
re_italic_bold = re.compile(r"(\s|^)//''([^/']+)''//")
re_underscore = re.compile(r"(\s|^)__([^_]+)__")
re_superscript = re.compile(r"(\W|\d|^)\^\^([^^]+)\^\^")
re_subscript = re.compile(r"(\s|^),,([^,]+),,")
re_definition = re.compile(r'^; *([^ ].*)$')
re_whitespace_only = re.compile(r'^[ \t]*\n$')
re_table = re.compile(r'^\|')
re_separator_cell = re.compile(r'\|-{0,2}\|')

ALL_TIDDLERS = []


class style():
    RED = '\033[31m'
    GREEN = '\033[32m'
    YELLOW = '\033[33m'
    BLUE = '\033[34m'
    RESET = '\033[0m'


def error(text: str):
    print(style.RED + text + style.RESET)


def warning(text: str):
    print(style.YELLOW + text + style.RESET)


def info(text: str):
    print(style.BLUE + text + style.RESET)


def get_tiddler_list():
    # this function might slow down this script
    global ALL_TIDDLERS
    command = "grep -h '^title: ' *.meta *.tid | sed 's/^title: //'"
    result = subprocess.check_output(command, shell=True)
    ALL_TIDDLERS = result.decode().rstrip("\n").split("\n")


def is_tiddler(target: str) -> bool:
    # TODO: working directory might be different than tiddler directory
    if not ALL_TIDDLERS:
        get_tiddler_list()
    return target in ALL_TIDDLERS


def write_meta_file(lines: list, meta_file: Path) -> int:
    index = 0
    if lines[0].split(':', 1)[0] not in ['caption', 'created', 'modified',
                                         'tags', 'title', 'type']:
        # no header found
        return index

    type_defined = False
    try:
        with open(meta_file, 'w') as f:
            for index, line in enumerate(lines):
                if re.match(r'[a-z]+:', line):
                    if line.startswith('type:'):
                        # line = line.replace('type: text/vnd.tiddlywiki',
                        #                     'type: text/x-markdown')
                        line = 'type: text/markdown\n'
                        type_defined = True
                    f.write(line)
                else:
                    if not type_defined:
                        # add type property
                        line = 'type: text/markdown\n'
                        f.write(line)
                    break
        # TODO: Write meta file (with at least `type:`) when .tid file
        # doesn't contain a header?
    except PermissionError as e:
        error(str(e))
        sys.exit(1)

    # skip empty line after header
    if lines[index] == '\n':
        index += 1
    return index


def write(f: TextIO, line: str, quoted: bool = False):
    if quoted:
        line = f'> {line}'
    f.write(line)


def write_markdown_file(lines: list, md_file: Path) -> bool:
    try:
        print(md_file.name)
        with open(md_file, 'w') as f:
            codeblock = False
            blockquote = False
            table = False

            for line in lines:

                # block quote
                if blockquote:
                    if line.startswith('<<<'):
                        # end of block quote
                        blockquote = False
                        continue
                    # else:
                    #     line = '> ' + line

                if line.startswith('<<<'):
                    # start of block quote
                    blockquote = True
                    continue

                # code blocks
                if codeblock:
                    if line.startswith('```'):
                        # end of code block
                        codeblock = False
                    write(f, line, blockquote)
                    continue

                if line.startswith('```'):
                    # start of code block
                    codeblock = True
                    write(f, line, blockquote)
                    continue

                # images
                # Skip if image is a tiddler (not a path or URL)
                m = re_image.search(line)
                if m:
                    target = m.groups()[2]
                    if not is_tiddler(target):
                        if m.groups()[1]:
                            line = re_image.sub(r'<img src="\3" width="\2">',
                                                line)
                        else:
                            line = re_image.sub(r'<img src="\3">', line)

                # links
                # [[text|url]]
                line = re_named_external_link.sub(r'[\1](\2)', line)
                # [[url]]
                line = re_external_link.sub(r'<\1>', line)
                # [[Another tiddler]] → [Another tiddler](#Another%20tiddler)
                line = re_internal_link.sub(
                    lambda m: (
                        f'[{m.group(1)}](#{urllib.parse.quote(m.group(1))})'
                    ),
                    line
                )
                # [[internal link|Tiddler]] → [internal link](#Tiddler)
                # plain url
                line = re_url.sub(r'\1<\2>\3', line)

                # bold text
                line = re_bold.sub(r'\1**\2**', line)

                string = re.sub(r'__(.*)__', r'**\1**', '__test__')

                # italic text
                line = re_italic.sub(r'\1_\2_', line)

                # bold italic text
                line = re_bold_italic.sub(r'\1**_\2_**', line)
                line = re_italic_bold.sub(r'\1_**\2**_', line)

                # escape * inside words
                line = re.sub(r'([\w\d])\*([\w\d])', r'\1\*\2', line)

                # underscored text
                line = re_underscore.sub(r'\1<u>\2</u>', line)

                # superscripted text
                line = re_superscript.sub(r'\1<sup>\2</sup>', line)

                # subscripted text
                line = re_subscript.sub(r'\1<sub>\2</sub>', line)

                # list
                m = re.match(r'^([*#]+) ', line)
                if m:
                    markers = m.groups()[0]
                    indentation_level = len(markers) - 1
                    final_marker = '1.' if markers[-1] == '#' else '*'
                    line = (
                        ' '*4*indentation_level
                        + final_marker
                        + line[len(markers):]
                    )

                # headers (need to be migrated after lists because a Markdown
                # header looks like a WikiText numbered list item)
                i = 0
                while i < len(line) and line[i] == '!':
                    i += 1
                if i > 0:
                    line = line.replace('!', '#', i)
                    line = re.sub(r'^(#+)([^#\n ])', r'\1 \2', line)

                # definitions ;xxx :yyy
                line = re_definition.sub(r'**\1**', line)
                # https://www.markdownguide.org/extended-syntax/#definition-lists
                # Not supported by pulldown-cmark or md4c.
                # https://github.com/Jermolene/TiddlyWiki5/pull/6528
                # supports it

                # tables
                if line.startswith('|'):
                    if not table:
                        # first row of table
                        if line.endswith('h\n'):
                            line = line[:-2] + '\n'
                            # empty header cells should contain at least
                            # one space (depends on Markdown parser)
                            while '||' in line:
                                line = line.replace('||', '| |')
                            write(f, line, blockquote)

                            # insert separator line
                            separator = re.sub(r'[^|\n]', '-', line)
                            # center align all columns, use at least
                            # three dashes per cell ('|:---:|')
                            while re_separator_cell.search(separator):
                                separator = re_separator_cell.sub('|:---:|',
                                                                  separator)
                            while re.search(r'\|--+-\|', separator):
                                separator = re.sub(r'\|-(-+)-\|', r'|:\1:|',
                                                   separator)
                            write(f, separator, blockquote)
                        else:
                            # no header row: insert dummy header row
                            write(f, re.sub(r'[^|\n]', ' ', line), blockquote)
                            write(f, re.sub(r'[^|\n]', '-', line), blockquote)
                            # TODO: separators need at least three dashes
                            write(f, line, blockquote)
                        table = True
                        continue
                else:
                    if table:
                        # first line after a table
                        if not re_whitespace_only.match(line):
                            # insert empty line
                            write(f, '\n', blockquote)
                    table = False

                write(f, line, blockquote)
    except IOError as err:
        error(err)
        return False
    return True


def migrate_tid_file(
        tid_file: Path = None,
        update: bool = False,
        output_directory: Path = None,
        tables: bool = False) -> bool:
    if output_directory:
        meta_file = output_directory / tid_file.name
    else:
        meta_file = tid_file
    meta_file = meta_file.with_suffix('.md.meta')
    md_file = meta_file.parent / meta_file.stem  # rstrip .meta

    if (update and md_file.exists()
            and os.path.getmtime(md_file) > os.path.getmtime(tid_file)):
        # keep the existing markdown file because it's newer than
        # the .tid file
        return False

    try:
        with open(tid_file) as f:
            lines = f.readlines()
    except IOError as error:
        error(err)
        return False

    if lines[0].startswith('color:'):
        warning(f"'{tid_file.name}' is a tag/color tiddler. Skipping it.")
        return False

    if any([re_special_tag.match(line) for line in lines[:10]]):
        # special tiddler (like a macro or table of contents) → skip
        warning(f"'{tid_file.name}' is tagged as a special tiddler. "
                "Skipping it.")
        return False

    if any([re_special_title.match(line) for line in lines[:10]]):
        # special tiddler (title starts with $:/) → skip
        warning(f"'{tid_file.name}' has a special title. "
                "Skipping it.")
        return False

    if tables is False and any([re_table.match(line) for line in lines]):
        warning(f"'{tid_file.name}' contains a table. Skipping it.")
        return False

    index_content = write_meta_file(lines, meta_file)

    result = write_markdown_file(lines[index_content:], md_file)
    if result is False:
        meta_file.unlink()
        md_file.unlink()

    return result


def main(tid_files: list = None, update: bool = False,
         delete_input: bool = False, output_directory: Path = None,
         tables: bool = False):
    skip_count = 0
    migrate_count = 0
    os.system("")  # Enables color output on Windows 10 (not tested)

    if output_directory and not output_directory.is_dir():
        error(f"The output directory '{output_directory}' does not exist!")
        sys.exit(1)

    for tid_file in tid_files:
        if tid_file.name.startswith('$__'):
            warning(f"'{tid_file.name}' looks like a system tiddler. "
                    "Skipping it.")
            skip_count += 1
            continue
        if migrate_tid_file(tid_file, update, output_directory, tables):
            # TODO: Delete if migration was skipped because of existing
            # markdown file?
            if delete_input:
                tid_file.unlink()
            migrate_count += 1
        else:
            skip_count += 1

    info(f"\n{migrate_count} tiddlers migrated to Markdown.")
    if skip_count:
        info(f"{skip_count} tiddlers skipped.")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(epilog=__doc__)
    parser.add_argument("-u", "--update", action="store_true",
                        help="Migrate only when output file doesn't yet exist "
                        "or when it's older than the tid file.")
    parser.add_argument("-d", "--delete", action="store_true",
                        help="Delete input files after migration.")
    parser.add_argument("-t", "--tables", action="store_true",
                        help="Include tiddlers containing tables.")
    parser.add_argument("-o", "--output-directory",
                        type=Path,
                        default=None,
                        help="Write markdown files in this directory.")
    parser.add_argument("files", nargs='+',
                        type=Path,
                        help=".tid files to migrate to Markdown.")
    args = parser.parse_args()

    main(args.files, args.update, args.delete, args.output_directory,
         args.tables)