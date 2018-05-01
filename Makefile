.PHONY: build

start-dev:
	$(MAKE) clean-build
	npm start

build:
	$(MAKE) clean-build
	npm run build
	cd build; zip -r -T release.zip ./*; cd ..
	du -h build/release.zip

build-ci:
	npm run lint
	$(MAKE) build

clean-build:
	rm -rf ./build
	mkdir -p ./build
