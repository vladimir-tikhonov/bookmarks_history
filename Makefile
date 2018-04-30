.PHONY: build

start-dev:
	$(MAKE) clean-build
	$(MAKE) setup-build
	npm start

build:
	$(MAKE) clean-build
	$(MAKE) setup-build
	npm run build
	cd build; zip -r -T release.zip ./*; cd ..
	du -h build/release.zip

build-ci:
	npm run lint
	$(MAKE) build

clean-build:
	rm -rf ./build/*

setup-build:
	mkdir -p build
	$(MAKE) build-assets

build-assets:
	cp src/pages/* ./build/
	npm run generate_manifest
