# options
PACKAGE = "TiddlyWiki5"
PKGNAME = "neotw"
CMD = @tiddlywiki
OUTPUTDIR = public
PORT = 8099
USERNAME = $(USER)
HOST = "0.0.0.0"
SERVICECMD = "systemctl"
SERVICETEMPLATEFILE = "neotw-template.service"
SERVICEFILE = "neotw-user.service"
SERVICETARGETFILE = "$(HOME)/.config/systemd/user/$(SERVICEFILE)"
NEOTWBIN = "$(HOME)/.local/bin/$(PKGNAME)"
neotwdir-user= "$(PWD)"

# adjust os, just test on linux
ifeq ($(shell uname),Linux)
	PLATFORM="🐧 Linux"
else
	PLATFORM="😭 Not supported"
endif

# startup tiddlywiki
run:
	@echo "ℹ️  Your current OS is $(PLATFORM) \
		🚀 startup $(PACKAGE)"
	$(CMD) --listen port=$(PORT) anon-username=$(USERNAME) 2>&1 &
# startup to the world
run-to-the-world:
	@echo "👋 startup $(PACKAGE) to the world"
	$(CMD) --listen port=$(PORT) anon-username=$(USERNAME) host=$(HOST)
# generate index.html
build:
	@rm -rf tiddlers/\$__StoryList*.tid
	@echo 🛺 cleaned StoryList
	$(CMD) --output $(OUTPUTDIR) --build index
	@echo "🎉 generated $(OUTPUTDIR)/index.html"
# TODO adjust exist dir
# how to work `;`
# install service
install:
	@echo "tiddlywiki --listen anon-username='anonymous'" > $(NEOTWBIN)
	@chmod +x ~/.local/bin/$(PKGNAME)
	@echo "🎉 installed neotw"
install-service:
	@cp $(SERVICETEMPLATEFILE) $(SERVICEFILE)
	@sed -i "s#neotwdir#$(neotwdir-user)#" $(SERVICEFILE)
	@mv $(SERVICEFILE) $(SERVICETARGETFILE)
	@echo "🎉 $(SERVICETARGETFILE) file has installed"
# changed
reload:
	$(SERVICECMD) --user daemon-reload
# service
# use hight color
# maybe should start byhand firstly
enable:
	$(SERVICECMD) enable --user $(SERVICEFILE)
disable:
	$(SERVICECMD) disable --user $(SERVICEFILE)
status:
	$(SERVICECMD) status --user $(SERVICEFILE)
start:
	$(SERVICECMD) start --user $(SERVICEFILE)
	@echo "$(SERVICEFILE) has started, Click this address https://127.0.0.1:$(PORT) to open"
restart:
	$(SERVICECMD) restart --user $(SERVICEFILE)
	@echo "$(SERVICEFILE) has restared, Click this address https://127.0.0.1:$(PORT) to open"
stop:
	$(SERVICECMD) stop --user $(SERVICEFILE)
	@echo $(SERVICEFILE) has stopped
uninstall:
	rm -i $(NEOTWBIN)
	@echo "👋 $(NEOTWBIN) file has uninstalled"
# uninstall service
uninstall-service:
	# Uninstall service
	@rm -f -i $(SERVICETARGETFILE);
	@echo "👋 $(SERVICETARGETFILE) file has removed"
test:
	@echo "${PWD}"

# clean
.PHONY: clean
clean:
	-rm -rf $(OUTPUTDIR)
trash:
	@rm -rf \
		tiddlers/Draft* \
		tiddlers/*__StoryList*.tid
		# tiddlers/*__trashbin* \
