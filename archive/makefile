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

ENABLESTATIC := false
PACKAGE := TiddlyWiki5
PKGNAME := neotw
CMD := @./node_modules/tiddlywiki/tiddlywiki.js
NEOTWTEMP := /tmp/neotw-temp
PORT := 8099
HOST := "0.0.0.0"
ServiceName := neotw-user.service
SERVICECMD := @systemctl --user
SERVICETEMPLATEFILE := src/neotw-template.service
SERVICEFILE := templates/neotw-user-template.service
SERVICETARGETFILE := $(HOME)/.config/systemd/user/$(ServiceName)
NEOTWBIN := ~/.local/bin/$(PKGNAME)
logfile := /tmp/neotw.log
tidgi_dir := tidgi
# version := $(shell node -e "console.log(require('./package.json').version);")
dist := dist
Date := $(shell date)

PROJECT      := $(call GetFromPkg,name)
version := $(call GetFromPkg,version)

# or /usr/share/pixmaps
# have some refresh bug
# @cp ./img/s5.png ~/.icons/$(PKGNAME).png
# @ln -s img/flask.png ~/.icons/$(PKGNAME).png # need absoulte path
# sudo conflict chmod ?
# @sudo cp ./img/flask.png /usr/share/pixmaps/$(PKGNAME).png
install:
	@echo 'xdg-open "http://127.0.0.1:$(PORT)"' > $(NEOTWBIN); chmod +x $(NEOTWBIN)
	@cp src/neotw.desktop ~/.local/share/applications/$(PKGNAME).desktop;
	@sudo ln -s  $(PWD)/img/flask.png /usr/share/pixmaps/$(PKGNAME).png
	@echo "🎉 Installed $(PKGNAME) ✔ (notice start tiddlywiki service)"

# ~/.icons/$(PKGNAME).png
uninstall:
	@rm -rf $(NEOTWBIN)  ~/.local/share/applications/$(PKGNAME).desktop
	@sudo rm -rf /usr/share/pixmaps/$(PKGNAME).png
	@echo "👋 bye by @$(USER)"

# or yay tidgi directly
install-tidgi:
	@rm -rf $(tidgi_dir); mkdir $(tidgi_dir)/; cp src/tidgi-repo/PKGBUILD $(tidgi_dir)
	@cd $(tidgi_dir); makepkg; sudo pacman -U *.zst

# install tiddlywiki global
install-service:
	@cp -i $(SERVICEFILE) $(SERVICETARGETFILE)
	@sed -i -e "5c WorkingDirectory=$(PWD)" \
		-e "1i ;; automatically generated on $(Date)\n" $(SERVICETARGETFILE)
	@echo "🎉 $(SERVICETARGETFILE) file has installed"

	# uninstall service
uninstall-service:
	@rm -f -i $(SERVICETARGETFILE);
	@echo "👋 $(SERVICETARGETFILE) file has removed"

.PHONY: clean
clean:
	@rm -rf $(NEOTWTEMP) $(dist) $(TiddlyWiki-Git-File)
