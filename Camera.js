export default class Camera {
  constructor() {
    this.input = "";
    this.imageDate = {}
  }

  useCamera() {
    // 创建input 设置可唤起相机属性
    this.input = document.createElement("input");
    this.input.setAttribute("id", "input_upload_ID");
    this.input.setAttribute("type", "file");
    // 添加这个属性，就可以唤起相机的功能
    this.input.setAttribute("capture", "camera");
    // 这里如果不加属性 accept 是 "image/*" 或者 "video/*"，就默认打开摄像头，既可以拍照也可以录像
    this.input.setAttribute("accept", "image/*");
    this.input.setAttribute("style", "visibility:hidden");
    // 这里将创建的隐式input控件拼接到body的最后面，会增加页面的长度，所以要在适当的时候，移除掉这个隐式创建的input控件
    document.body.appendChild(this.input);
    // 这里是模拟点击了input控件
    this.input.addEventListener('change', e => this.change(e));

    // 调起摄像头
    this.input.click();
  }
  async change(event) {
    const file = event.target.files[0]
    const fileRes = await fetch('uplaod-file-url', { body: file })
    this.imageDate = fileRes.data
    console.log(fileRes.mesage)
    /* 上传图片后删除 input */
    document.getElementById('input_upload_ID').remove()
    this.input = null
  }
}