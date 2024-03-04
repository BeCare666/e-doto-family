
var editor = CKEDITOR.replace('editor1', {
    height:'400',
    width : '900',
    contentsCss : '',  
    //removePlugins : 'pastefromword',
    extraAllowedContent: 'h1;div{border,background-color};table[align,cellspacing]{margin,width,border,border-*};tr;td{border-color,height,vertical-align,width};tbody;th;span{background-color,background,color,font-size,font-family};p{margin-left,margin-right,margin-top,margin-bottom}'
  });
  
  editor.on('pluginsLoaded', function( evt ){
    evt.editor.filter.addTransformations( [
      [
        {
          element:'td',
          left: function( el ) {
            return el.name == 'td';
          },
          right: function( el, tools ) {
            if( el.attributes && el.attributes.valign ){
              el.styles['vertical-align'] = el.attributes.valign;
              delete el.attributes.valign;            
            }
          }
        }
      ],
      [
        {
          element:'div',
          left: function( el ) {
            return el.name == 'div';
          },
          right: function( el, tools ) {
            if( el.styles && el.styles['background'] ){
              el.styles['background-color'] = el.styles['background'];
              delete el.styles['background'];            
            }
          }
        }
      ],
    ]);					
  });
  
  