# options
PACKAGE = "TiddlyWiki5"
CMD = @tiddlywiki
OUTPUTDIR = public
PORT = 8099
USERNAME = $(USER)
HOST = "0.0.0.0"

# adjust os, just test on linux
ifeq ($(shell uname),Linux)
	PLATFORM="🐧 Linux"
else
	PLATFORM="😭 Not supported"
endif

# startup tiddlywiki
start:
	@echo "ℹ️  Your current OS is $(PLATFORM) \
		🚀 startup $(PACKAGE)"
	$(CMD) --listen port=$(PORT) anon-username=$(USERNAME)
# startup to the world
start-to-the-world:
	@echo "👋 startup $(PACKAGE) to the world"
	$(CMD) --listen port=$(PORT) anon-username=$(USERNAME) host=$(HOST)
# generate index.html
build:
	$(CMD) --output $(OUTPUTDIR) --build index
	@echo "🎉 generated index.html"

# clean public/ folder
.PHONY: clean
clean:
	-rm -rf $(OUTPUTDIR)
clean-trash:
	rm -rf tiddlers/*__trashbin*
