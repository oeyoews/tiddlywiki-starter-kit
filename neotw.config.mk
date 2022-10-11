# https://seisman.github.io/how-to-write-makefile
# https://www.zhaixue.cc/makefile/makefile-shell-function.html

define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef

# adjust os, just test on linux
ifeq ($(shell uname),Linux)
	PLATFORM="🐧 Linux"
else
	PLATFORM="😭 Not supported ✘"
endif

Description := "Hello"
ENABLESTATIC := false
PACKAGE := TiddlyWiki5
PKGNAME := neotw
CMD := @./node_modules/tiddlywiki/tiddlywiki.js
NEOTWTEMP := /tmp/neotw-temp
PORT := 8099
HOST := "0.0.0.0"
SERVICECMD := systemctl
SERVICETEMPLATEFILE := src/neotw-template.service
SERVICEFILE := neotw-user.service
SERVICETARGETFILE := $(HOME)/.config/systemd/user/$(SERVICEFILE)
NEOTWBIN := $(HOME)/.local/bin/$(PKGNAME)
neotwdir-user:= $(PWD)
repo-plateform := gitlab
subwiki-address := https://$(repo-plateform).com/$(USER)/subwiki.git
archrepo := ssh://aur@aur.archlinux.org/tidgi.git
logfile := /tmp/neotw.log
tidgi_dir := tidgi
# version := $(shell node -e "console.log(require('./package.json').version);")
dist := dist
tiddlywiki_configfile := tiddlywiki.info
TestVariable := test
PackageJson := package.json
BumpFile := bump.mjs
Lib := lib
CommitId := $(shell git rev-parse --short HEAD && git show --pretty=format:"%ci %cr" | head -1)

PROJECT      := $(call GetFromPkg,name)
version := $(call GetFromPkg,version)
