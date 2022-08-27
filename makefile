# options
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
	@echo "$(PLATFORM) 🚀 startup tiddlywiki"
	$(CMD) --listen port=$(PORT) anon-username=$(USERNAME)
start-to-the-world:
	@echo "👋 startup tiddlywiki to the world"
	$(CMD) --listen port=$(PORT) anon-username=$(USERNAME) host=$(HOST)
# generate index.html
generate:
	$(CMD) --output $(OUTPUTDIR) --build index
	@echo "🎉 generated index.html"

# clean public/ folder
.PHONY: clean
clean:
	-rm -rf $(OUTPUTDIR)
