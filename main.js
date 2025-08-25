// エレメントオブジェクトを作成する
const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children : children.map(child => typeof child === "object" ? child : createTextElement(child)),
    },
  };
};

// テキストエレメントオブジェクトを作成する
const createTextElement = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

// render関数
const render = (element, container) => {
  const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);

  Object.keys(element.props).filter(key => key !== "children").forEach(key => {
    dom[key] = element.props[key];
  });

  element.props.children.forEach(child => {
    render(child, dom);
  });
  container.appendChild(dom);
}

const TeruReact = {
  render,
  createElement,
  createTextElement,
}



const element = TeruReact.createElement(
  "div",
  {
    title: "foo",
  },
  "Hello",
  TeruReact.createElement("b", null, "world"),
);

const container = document.getElementById("root");
TeruReact.render(element, container);

export default TeruReact;