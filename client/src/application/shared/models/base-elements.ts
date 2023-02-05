export interface Options {
  tagName: keyof HTMLElementTagNameMap;
  classList?: string[];
  content?: string;
}

export interface LinkOptions extends Options {
  target?: string;
  href?: string;
}

export interface RouteOptions extends Options {
  id?: string;
}

export interface FormOptions extends Options {
  action?: string;
}

export interface ButtonOptions extends Options {
  id?: string;
  type?: string;
  disabled?: boolean;
}

export interface InputOptions extends Options {
  type?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  selected?: boolean;
  min?: string;
  max?: string;
  checked?: boolean;
  readonly?: boolean;
  step?: string;
}

export interface ImageOptions extends Options {
  src: string;
  alt?: string;
}

export interface IFrameOptions extends Options {
  id?: string;
  src?: string;
  frameborder?: string;
}

export interface ScriptOptions extends Options {
  src: string;
  id?: string;
}
