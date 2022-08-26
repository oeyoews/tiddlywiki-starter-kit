CMD = @tiddlywiki
OUTPUTDIR = public
PORT = 8099

start:
	@echo "🚀 startup tiddlywiki"
	$(CMD) --listen port=$(PORT)
generate:
	$(CMD) --output $(OUTPUTDIR) --build index
	@echo "🎉 generated index.html"

.PHONY: clean
clean:
	-rm -rf $(OUTPUTDIR)
