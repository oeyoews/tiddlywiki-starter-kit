include ./neotw.config.mk
include ./src/color.mk

example:
	@$(CMD) dev --build example

init-info-file:
	@cp templates/tiddlywiki-template.info $(tiddlywiki_configfile)
	@sed -i -e "s/AUTHOR/$(USER)/" \
		-e "s/PORT/$(PORT)/" \
		-e "\$$d" $(tiddlywiki_configfile)

update-git-commit:
	@cp templates/commit-template.tid $(TiddlyWiki-Git-File)
	@sed -i -e "s#LONGID#$(LongCommitId)#" \
		-e "s#SHORTID#$(ShortCommitId)#" $(TiddlyWiki-Git-File)
	@echo -e 🎉 update-git-commit $(Green)Finished ✔ $(Color_off)

# generate index.html(support subwiki, but not build html no include subwiki)
# note: because use make, so can't read this `tiddlywiki` cmd from current project, recommend install tiddlywiki global, likw `yarn global add tiddlywiki`
# should before build
build: $(Lib)
	# prepare sed
	@make update-git-commit; make init-info-file
	@echo -e  👷 $(Green)Building 🗘 $(Color_off)
	@sh ./lib
	@rm -rf $(dist) $(NEOTWTEMP); mkdir $(NEOTWTEMP)
	@make example
	@cp -r tiddlers/ dev/ tiddlywiki.info $(NEOTWTEMP)
# if error how to exit
	@rm -rf $(NEOTWTEMP)/tiddlers/subwiki \
		$(NEOTWTEMP)/tiddlers/trashbin \
	 	$(NEOTWTEMP)/tiddlers/\$$__StoryLis*.tid
	$(CMD) $(NEOTWTEMP) --build main >> $(logfile) 2>&1  # build
	@cp src/index.html $(dist)
# $(CMD) $(NEOTWTEMP) --build static >> $(logfile) 2>&1  # static giscus and commpand palette widget have a error
# $(CMD) public --build favicon >> /tmp/neotw.log 2>&1  # favicon
# $(CMD) public --output dist/ --build debug >> /tmp/neotw.log 2>&1  # build
	@mv library/ $(dist)
	@cp -r src/vercel.json $(dist);  # disable vercel
	@ls -sh $(dist)/*.html # patch
	@tree $(dist) -L 1
	@echo -e 🎉 $(Green)Finished ✔ $(Color_off)

build-lib: $(Lib)
	@sh ./lib

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
