const propFix = {
  "for": "htmlFor",
  "class": "className"
};

[
  "tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
].forEach( prop => {
  propFix[ prop.toLowerCase() ] = prop;
});


export default propFix;