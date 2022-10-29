include ./neotw.config.mk
include ./src/color.mk

init-info-file:
	@cp templates/tiddlywiki-template.info $(tiddlywiki_configfile)
	@sed -i -e "s/AUTHOR/$(USER)/" \
		-e "s/PORT/$(PORT)/" \
		-e "\$$d" $(tiddlywiki_configfile)

info: $(PackageJson)
	@echo -e " current path is" $(PWD)
	@echo -e " Project: $(PROJECT)\n Version: $(version)\n Platform: $(PLATFORM)\n Commit: $(ShortCommitId)"

update-git-commit:
	@cp templates/commit-template.tid $(TiddlyWiki-Git-File)
	@sed -i -e "s#LONGID#$(LongCommitId)#" \
		-e "s#SHORTID#$(ShortCommitId)#" $(TiddlyWiki-Git-File)
	@echo -e 🎉 update-git-commit $(Green)Finished ✔ $(Color_off)

bump: $(BumpFile)
	yarn zx bump.mjs

# startup tiddlywiki
run:
	@echo "ℹ️  Your current OS is $(PLATFORM) \
		🚀 startup $(PACKAGE)"
	# $(CMD) --listen port=$(PORT) anon-username=$(USER) 2>&1 &
	$(CMD) --build listen 2>&1 &

# startup to the world
run-to-the-world:
	@echo "👋 startup $(PACKAGE) to the world"
	$(CMD) --listen port=$(PORT) anon-username=$(USERNAME) host=$(HOST)

# generate index.html(support subwiki, but not build html no include subwiki)
# note: because use make, so can't read this `tiddlywiki` cmd from current project, recommend install tiddlywiki global, likw `yarn global add tiddlywiki`
# should before build
build: $(Lib)
	# prepare sed
	@make update-git-commit; make init-info-file
	@echo -e  👷 $(Green)Building 🗘 $(Color_off)
	@sh ./lib
	@rm -rf $(dist) $(NEOTWTEMP); mkdir $(NEOTWTEMP)
	@cp -r tiddlers/ dev/ tiddlywiki.info $(NEOTWTEMP)
# if error how to exit
	@rm -rf $(NEOTWTEMP)/tiddlers/subwiki \
		$(NEOTWTEMP)/tiddlers/trashbin \
	 	$(NEOTWTEMP)/tiddlers/\$$__StoryLis*.tid
	$(CMD) $(NEOTWTEMP) --build index >> $(logfile) 2>&1  # build
# $(CMD) $(NEOTWTEMP) --build static >> $(logfile) 2>&1  # static giscus and commpand palette widget have a error
# $(CMD) public --build favicon >> /tmp/neotw.log 2>&1  # favicon
# $(CMD) public --output dist/ --build debug >> /tmp/neotw.log 2>&1  # build
	@mv library/ $(dist)
	@cp -r src/vercel.json $(dist); ls -sh $(dist)/index.html # patch
	@tree $(dist) -L 1
	@echo -e 🎉 $(Green)Finished ✔ $(Color_off)

build-lib: $(Lib)
	@sh ./lib

# view
view:
	@google-chrome-stable $(dist)/index.html

view-log:
	@nvim $(logfile)

# bpview
bpview:
	@make build; google-chrome-stable $(dist)/index.html

# check dir
install-subwiki:
	@git clone --depth 1 $(subwiki-address) tiddlers/subwiki

install-archrepo:
	@git clone --depth 1 $(archrepo) dev/archrepo

# install service
install-bin:
	@echo "tiddlywiki --listen" > $(NEOTWBIN)
	@chmod +x ~/.local/bin/$(PKGNAME)
	@echo "🎉 Installed neotw ✔"

# or yay tidgi directly
install-tidgi:
	@rm -rf $(tidgi_dir); mkdir $(tidgi_dir)/; cp src/tidgi-repo/PKGBUILD $(tidgi_dir)
	@cd $(tidgi_dir); makepkg; sudo pacman -U *.zst

edit-config:
	@nvim $(tiddlywiki_configfile)

# install tiddlywiki global
install-service:
	@cp -i $(SERVICEFILE) $(SERVICETARGETFILE)
	@sed -i -e "5c WorkingDirectory=$(PWD)" \
		-e "1i ;; automatically generated on $(Date)\n" $(SERVICETARGETFILE)
	@echo "🎉 $(SERVICETARGETFILE) file has installed"

# use highlight color
# maybe should start byhand firstly
reload-service:
	$(SERVICECMD) daemon-reload
enable:
	$(SERVICECMD) enable $(ServiceName)
disable:
	$(SERVICECMD) disable $(ServiceName)
status:
	$(SERVICECMD) status $(ServiceName)
start:
	$(SERVICECMD) start  $(SERVICEFILE)
	@echo "$(SERVICEFILE) has started, Click this address https://127.0.0.1:$(PORT) to open"
	@make status

restart:
	$(SERVICECMD) restart $(ServiceName)
	@echo "$(ServiceName) has restared, Click this address https://127.0.0.1:$(PORT) to open"
	@make status

stop:
	$(SERVICECMD) stop $(SERVICEFILE)
	@echo $(SERVICEFILE) has stopped
uninstall:
	rm -i $(NEOTWBIN)
	@echo "👋 $(NEOTWBIN) file has uninstalled"
	# uninstall service
uninstall-service:
	@rm -f -i $(SERVICETARGETFILE);
	@echo "👋 $(SERVICETARGETFILE) file has removed"

.PHONY: clean
clean:
	@rm -rf $(NEOTWTEMP) $(dist) $(TiddlyWiki-Git-File)
