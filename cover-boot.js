(function(){
  var n = 8;
  var files = [];
  for (var i=1;i<=n;i++) files.push('cover-b64-'+i+'.txt');
  Promise.all(files.map(function(f){ return fetch(f,{cache:'no-store'}).then(function(r){ if(!r.ok) throw new Error(f+' '+r.status); return r.text(); }); }))
    .then(function(parts){
      var url = 'data:image/jpeg;base64,' + parts.join('').replace(/\s+/g,'');
      function apply(root){
        (root||document).querySelectorAll('img[src="grandma-dog.jpg"]').forEach(function(img){ img.src = url; });
      }
      apply(document);
      var mo = new MutationObserver(function(){ apply(document); });
      mo.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
    })
    .catch(function(e){ console.warn('cover-boot', e); });
})();
