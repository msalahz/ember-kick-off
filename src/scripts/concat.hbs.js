Ember.TEMPLATES["application"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = '';
  stack1 = helpers._triageMustache.call(depth0, "outlet", {"name":"_triageMustache","hash":{},"hashTypes":{},"hashContexts":{},"types":["ID"],"contexts":[depth0],"data":data});
  if (stack1 != null) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
},"useData":true});
Ember.TEMPLATES["index"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  data.buffer.push("<div align=\"center\">\r\n    <br/><br/><br/><br/><br/><br/><br/>\r\n    <h1>Get Started with <a target=\"_blank\" href=\"https://github.com/msalahz/ember-kick-off\">EMBER-KICK-OFF</a></h1>\r\n</div>\r\n");
  },"useData":true});