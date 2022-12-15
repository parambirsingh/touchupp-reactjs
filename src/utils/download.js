import html2canvas from "html2canvas";

export const download = async (name,data) => {
  let img = new Image();
  try {
    img.onload = async function () {
      document.body.appendChild(img);
      const canvas = await html2canvas(img);
      document.body.removeChild(img);
      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");
      let ext = data.slice(data.indexOf("/") + 1, data.indexOf(";"));

      link.href = data;
      link.download = name + "." + ext;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = data;
  } catch (ex) {
    document?.body?.removeChild(img);
  }
};
