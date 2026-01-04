const importObject = {
  m: {}
};

const compileOptions = {
  builtins: ["js-string"],
  importedStringConstants: "string_constants",
};

self.onmessage = (e) => {
  if (e.data === 'check') {
    fetch("/assets/wasm/probability.wasm")
      .then((response) => response.arrayBuffer())
      .then((bytes) => WebAssembly.compile(bytes, compileOptions))
      .then((module) => WebAssembly.instantiate(module, importObject))
      .then((instance) => {
        const result = instance.exports.check_probability();
        postMessage(result);
      })
      .catch((err) => {
        console.error('Error loading WebAssembly:', err);
        postMessage(false);
      });
  }
};
