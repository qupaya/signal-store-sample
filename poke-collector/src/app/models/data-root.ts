export interface Root<T> {
  data: Data<T>;
}

export interface Data<T> {
  items: T[];
}
