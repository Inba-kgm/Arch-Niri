(() => {
  // src/dialog/window/window.ts
  var log = (message) => {
    const container = document.createElement("p");
    container.appendChild(document.createTextNode(message));
    container.onclick = () => container.remove();
    const logArea = document.querySelector("#log-container");
    logArea?.appendChild(container);
  };
  var pluginMessageListeners = [];
  window.onmessage = (event) => {
    if (!event.origin.startsWith("file:")) {
      log(`Ignored message with origin ${event.origin}`);
      return;
    }
    const data = event.data;
    if (data.kind === "addScript") {
      const src = event.data.src;
      if (src.endsWith(".js")) {
        const scriptElement = document.createElement("script");
        scriptElement.src = src;
        document.head.appendChild(scriptElement);
      } else {
        const linkElement = document.createElement("link");
        linkElement.href = src;
        linkElement.rel = "stylesheet";
        document.head.appendChild(linkElement);
      }
    } else if (data.kind === "setHtml") {
      document.body.innerHTML = data.html;
    } else if (data.kind === "setButtons") {
      const buttons = data.buttons;
      const buttonElements = [];
      for (const buttonRecord of buttons) {
        const buttonElement = document.createElement("button");
        buttonElement.innerText = buttonRecord.title ?? buttonRecord.id;
        buttonElement.onclick = () => {
          window.parent.postMessage(
            {
              kind: "dialogResult",
              result: { id: buttonRecord.id }
            },
            "*"
          );
          window.close();
        };
        buttonElements.push(buttonElement);
      }
      let buttonContainer = document.querySelector(".button-container");
      if (buttonContainer) buttonContainer.remove();
      buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");
      buttonContainer.replaceChildren(...buttonElements);
      document.body.appendChild(buttonContainer);
    } else {
      pluginMessageListeners.forEach((l) => l(event));
    }
  };
  window.addEventListener("error", (e) => {
    log(e.toString() + e.error.stack);
  });
  window.webviewApi = {
    postMessage: (message) => {
      const id = Math.random();
      window.parent.postMessage(
        {
          message,
          id
        },
        "*"
      );
      return new Promise((resolve) => {
        const responseListener = (event) => {
          if (event.data.responseId === id) {
            pluginMessageListeners = pluginMessageListeners.filter((l) => l !== responseListener);
            resolve(event.data.response);
          }
        };
        pluginMessageListeners.push(responseListener);
      });
    },
    onMessage: (listener) => {
      pluginMessageListeners.push((event) => {
        if (event.data.message) {
          listener(event.data);
        }
      });
    }
  };
})();
