export interface Image {
  src?: string;
  alt?: string;
}

export interface SelectedImage extends Image {
  createdAt?: string;
}
