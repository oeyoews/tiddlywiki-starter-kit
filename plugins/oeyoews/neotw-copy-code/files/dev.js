function addCopyImageButton() {
  const imageElements = document.querySelectorAll(".tc-story-river img");

  imageElements.forEach((imageElement) => {
    const existingButton =
      imageElement.parentNode.querySelector(".copy-image-button");
    if (existingButton) {
      existingButton.remove();
    }

    const copyButton = $tw.utils.domMaker("button", {
      text: "📷",
      class: "copy-image-button hover:bg-gray-200 transition duration-200",
      attributes: {
        title: "Copy image",
      },
    });
    copyButton.addEventListener("click", () => {
      if (imageElement.src.startsWith("data:")) {
        const base64Data = imageElement.src.split(",")[1];
        const mimeType = imageElement.src.split(";")[0].split(":")[1];

        const byteArray = atob(base64Data);
        const byteNumbers = new Array(byteArray.length);
        for (let i = 0; i < byteArray.length; i++) {
          byteNumbers[i] = byteArray.charCodeAt(i);
        }

        const byteArrayUint8 = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArrayUint8], { type: mimeType });

        navigator.clipboard
          .write([new ClipboardItem({ [mimeType]: blob })])
          .then(() => {
            copyButton.textContent = "✅ Copied!";
            setTimeout(() => {
              copyButton.textContent = "📷";
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        fetch(imageElement.src)
          .then((response) => response.blob())
          .then((blob) => {
            const clipboardData = new DataTransfer();
            clipboardData.items.add(new ClipboardItem({ "image/png": blob }));

            navigator.clipboard
              .write(clipboardData)
              .then(() => {
                copyButton.textContent = "✅ Copied!";
                setTimeout(() => {
                  copyButton.textContent = "📷";
                }, 2000);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    imageElement.parentNode.appendChild(copyButton);
  });
}

exports.addCopyImageButton = addCopyImageButton;
