import html2canvas from "html2canvas";

export const download = async (name,data) => {
  let img = new Image();
  img.id = 'downloadImg'
    img.onload = async function () {
      let link;
      try {        
        document.body.appendChild(img);
        const canvas = await html2canvas(img);
        document.body.removeChild(img);
        const data = canvas.toDataURL("image/jpg");
         link = document.createElement("a");
        let ext = data.slice(data.indexOf("/") + 1, data.indexOf(";"));
        link.href = data;
        link.download = name + "." + ext;
        document.body.appendChild(link);
        document.body.removeChild(link);
        link.click();
      } catch (ex) {
           document.body.removeChild(img);
           document.body.removeChild(link);
      }
    };
    img.src = data;
};
