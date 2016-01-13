angular.module("app.services").run(["$templateCache", function($templateCache) {$templateCache.put("/src/client/app/home/aboutBox.html","<div class=\"aboutBox homeInfoBox\"><div class=lightText><h2>Technology, Research, and Analysis</h2><p>I deeply enjoy solving puzzles. The problems of today are solved with a variety of skills, but the three that I am most passionate about are research, analytic tradecraft, and technology.</p><p>I am currently focused on understanding the web platform, specifically how best practices should evolve in the age of web components, HTTP2, and JavaScript transpilation.</p><p>Though I am proficient with HTML, CSS, build processes, and version control, my primary near-term goal is attaining a comprehensive understanding of JavaScript and how its unique qualities can be leveraged to build applications and open-source projects.</p></div></div>");
$templateCache.put("/src/client/app/home/headerTileHolder.html","<div class=tileHolder><div class=bookContainer alt=\"image of book on drone warfare co-authored by Matthew Fricker\"><a class=fullSizedLink href=\"http://www.amazon.com/Drone-Debate-Unmanned-Conventional-Battlefields/dp/1442230592/ref=sr_1_1?ie=UTF8&qid=1449081007&sr=8-1\"></a></div><div class><h1>Matthew S. Fricker</h1><h5 class=\"altText altTextColor\">JavaScript Programmer & Drone Researcher</h5></div><div ng-click=\"vm.redirect(\'/#/blog\')\"><i class=\"fa fa-book\"></i>Blog</div><div ng-click=\"vm.redirect(\'http://bit.ly/1yfhRm5\')\"><i class=\"fa fa-linkedin-square\"></i> LinkedIn</div><div ng-click=\"vm.redirect(\'http://bit.ly/1HETkAy\')\"><i class=\"fa fa-github-square\"></i> Github</div></div>");
$templateCache.put("/src/client/app/home/homePage.html","<header-tile-holder></header-tile-holder><about-box></about-box><portfolio-box></portfolio-box>");
$templateCache.put("/src/client/app/home/portfolioBox.html","<div class=\"portfolioOuterBox homeInfoBox\"><div><h2 class=lightText>Sites that I have built</h2><div class=portfolioWrapper><div ng-repeat=\"project in vm.portfolio\" class=portfolioItem><header class=portfolioItemTitles><h4>{{project.title}}</h4></header><div class=portfolioItemImage><a href={{project.link}}><img class=fillContainerWidth ng-src={{project.imageSrc}} alt={{project.imageAlt}}></a></div><footer class=\"portfolioItemDetails lightText\"><h5 class=\"altText pointer\" ng-click=\"project.showTools = !project.showTools\"><i class=fa ng-class=\"project.showTools ? \'fa-chevron-up\' : \'fa-chevron-down\'\"></i> Tools that were used:</h5><ul ng-show=project.showTools class=toolsUsed><li ng-repeat=\"tool in project.tools\">{{tool}}</li></ul></footer></div></div></div></div>");
$templateCache.put("/src/client/app/blog/blogHeader.html","<div class=blogHeader><img ng-src=/img/frickersaurus.png alt=\"Picture of the Frickersaurus, drawn by my loving wife\"><h1>The Frickersaurus</h1><h3>Sharing learning resources and tips<h3></h3></h3></div>");
$templateCache.put("/src/client/app/blog/blogList.html","<blog-header></blog-header><blog-summary ng-repeat=\"post in vm.blogList\" blog-post=post></blog-summary>");
$templateCache.put("/src/client/app/blog/blogSummary.html","<div class=blogSummary><h1>{{blogPost.title}}</h1><h5>{{blogPost.date}}</h5><blog-tags tag-array=blogPost.tags></blog-tags><p>{{blogPost.paragraphs[0]}}</p></div>");
$templateCache.put("/src/client/app/blog/blogTags.html","<ul class=blogTags><li ng-repeat=\"tag in tagArray track by $index\">{{tag}}</li></ul>");
$templateCache.put("/src/client/app/blog/fullBlogPost.html","<div class=fullBlogPost><h1>{{currentPost.title}}</h1><h5>{{currentPost.date | date :\"fullDate\"}}</h5><p ng-repeat=\"paragraph in currentPost.paragraphs track by $index\" ng-class=\"{ \'headerParagraph\': $index == 0}\">{{paragraph}}</p></div>");
$templateCache.put("/src/client/app/blog/post.html","<blog-header></blog-header><full-blog-post current-post=vm.post></full-blog-post>");}]);