import React from "react";

export interface IButton {
  children?: React.ReactNode;
  onClick?: any;
  active?: boolean;
  style?:any;
}

export interface ICallToActionButton {
  children?: React.ReactNode;
  onClick?: any;
  active?: boolean;
  style?:any;
}

export type Icon = React.FC<{
  style?:any;
}>

export interface IListTree {
  children?: React.ReactNode;
  name: string;
  style?: any;
  defaultOpen?: boolean;
  info?: string;
  isUlElement?:boolean;
  index?: number;
  animation_data?:any;
  calculator?:any;
}

export interface IInputTree {
  style?: any;
  name: string;
  defaultVal: number;
  min: number;
  max: number;
}

export interface IInput {
  style?: any;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: any;
  onKeyUp?: any;
  onKeyDown?: any;
  onBlur?: any;
  onFocus?: any;
}

export interface ISVG {
  pathStyle?: any;
  svgStyle?:any;
  svgWidth?: number;
  svgHeight?: number;
  svgScale?: number;
  svgData?: string;
}

export interface IDescText {
  style?: any;
  children?: React.ReactNode;
}


// export interface IPaginator {
//   pageCount: number;
//   index: number;
//   pathPrefix: string;
// }

// interface IGatsbyImage {
//   src: string;
//   base64?: string;
//   srcWebp?: string;
//   srcSet?: string;
//   srcSetWebp?: string;
//   tracedSVG?: string;
// }

// interface IGatsbyImageFluid extends IGatsbyImage {
//   maxHeight: number;
//   maxWidth: number;
// }

// interface IGatsbyImageFixed extends IGatsbyImage {
//   height: number;
//   width: number;
// }

// export interface ITag {
//   name: string;
//   times: number;
// }

// export interface IAuthor {
//   authorsPage?: boolean;
//   featured?: boolean;
//   name: string;
//   slug: string;
//   bio: string;
//   avatar: {
//     image: IGatsbyImageFluid;
//     full: IGatsbyImageFluid;
//   };
// }

// export interface IArticle {
//   slug: string;
//   authors: IAuthor[];
//   excerpt: string;
//   body: string;
//   id: string;
//   tag: string[];
//   hero: {
//     full: IGatsbyImageFluid;
//     preview: IGatsbyImageFluid;
//     regular: IGatsbyImageFluid;
//     seo: string;
//   };
//   timeToRead: number;
//   date: string;
//   secret: boolean;
// }

// interface IArticleQuery {
//   edges: {
//     node: IArticle;
//   }[];
// }

// export interface IProgress {
//   height: number;
//   offset: number;
//   title: string;
//   mode: string;
//   onClose?: () => void;
// }

// export type Icon = React.FC<{
//   fill: string
// }>

// export type Template = React.FC<{
//   pageContext: {
//     article: IArticle;
//     authors: IAuthor[];
//     mailchimp: boolean;
//     next: IArticle[];
//   };
//   location: Location;
// }>