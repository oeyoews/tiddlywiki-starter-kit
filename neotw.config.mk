define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef

ENABLESTATIC = false
PACKAGE = TiddlyWiki5
PKGNAME = neotw
CMD = @./node_modules/tiddlywiki/tiddlywiki.js
NEOTWTEMP = neotw-temp
PORT = 8099
HOST = "0.0.0.0"
SERVICECMD = systemctl
SERVICETEMPLATEFILE = src/neotw-template.service
SERVICEFILE = neotw-user.service
SERVICETARGETFILE = $(HOME)/.config/systemd/user/$(SERVICEFILE)
NEOTWBIN = $(HOME)/.local/bin/$(PKGNAME)
neotwdir-user= $(PWD)
repo-plateform = gitlab
subwiki-address = https://$(repo-plateform).com/$(USER)/subwiki.git
archrepo = ssh://aur@aur.archlinux.org/tidgi.git
logfile = /tmp/neotw.log
tidgi_dir = tidgi
# version = $(shell node -e "console.log(require('./package.json').version);")
dist = dist
tiddlywiki_configfile = tiddlywiki.info
TestVariable = test

PROJECT      := $(call GetFromPkg,name)
version := $(call GetFromPkg,version)
