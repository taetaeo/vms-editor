type Parameters<T, I, V> = {
  textObjectConfig?: T;
  imageObjectConfig?: I;
  videoObjectConfig?: V;
};

export default class ObjectConfigState<T, I, V> {
  public textObjectConfig?: T;
  public imageObjectConfig?: I;
  public videoObjectConfig?: V;

  constructor(params: Parameters<T, I, V>) {
    this.textObjectConfig = params.textObjectConfig;
    this.imageObjectConfig = params.imageObjectConfig;
    this.videoObjectConfig = params.videoObjectConfig;
  }
}
