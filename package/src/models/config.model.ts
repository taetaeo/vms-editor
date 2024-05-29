type Parameters<T, I, V> = {
  textConfig?: T;
  imageConfig?: I;
  videoConfig?: V;
};

export default class ObjectConfigModel<T, I, V> {
  public textConfig?: T;
  public imageConfig?: I;
  public videoConfig?: V;

  constructor(params: Parameters<T, I, V>) {
    this.textConfig = params.textConfig;
    this.imageConfig = params.imageConfig;
    this.videoConfig = params.videoConfig;
  }
}
