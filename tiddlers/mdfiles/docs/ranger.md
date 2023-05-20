## Ranger
r # choose open file's tool.

[ or ] # choose parent folder.

zh or ctrl h  to show hidden files.

cw # rename file_name. or use 'a' 'A'

i  # preview like vim but not vim for work.

v  or space  # select file

w # task manager.

always look for github_wikis.

tsz -i file_name.

## Rename
- cw
- a

S   //进入指定的文件夹，进入一个新的终端，退出当前的终端，会再次回到ranger中

/ #search

gg G # same vim

yy dd pp # 复制剪切 粘贴

f # 查找

A # 在当前的基础上进行重命名

I  # 同上   same vim

dD   # 彻底删除

  on/ob   根据文件名进行排序(natural/basename)
  oc      根据改变时间进行排序 (Change Time 文件的权限组别和文件自身数据被修改的时间)
  os      根据文件大小进行排序(Size)
ot      根据后缀名进行排序 (Type)

  oa      根据访问时间进行排序 (Access Time 访问文件自身数据的时间)
om      根据修改进行排序 (Modify time 文件自身内容被修改的时间)

  zp   # 预览代码

  zP # 打开目录预览

  cat file_name | tsz

  cd ~/.config/ranger/rifle.conf
  export RANGER_LOAD_DEFAULT_RC=FALSE
  sudo pacman -S  --noconfirm libcaca highlight atool lynx w3m elinks  mediainfo   # install  depencies

#找出含有docx的一行，然后将其注释起来：
#ext docx?, has catdoc,       terminal = catdoc -- "$@" | "$PAGER"
  s # enter this shell environment.
  git clone https://github.com/alexanderjeurissen/ranger_devicons ~/.config/ranger/plugins/ranger_devicons
  echo "default_linemode devicons" >> $HOME/.config/ranger/rc.conf   # add devicons

  - ranger --copy-config=all  # configure some files
  - [ranger_tutor](https://blog.csdn.net/lxyoucan/article/details/115671189)

- can't start because of version?
- rm -rf .local/share/ranger/*

- f (like fzf)
