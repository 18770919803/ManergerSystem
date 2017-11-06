##Node.j中path模块对路径的操作(引自http://www.cnblogs.com/duhuo/p/4752640.html)



在node.js中，提供了一个path某块，在这个模块中，提供了许多使用的，可被用来处理与转换路径的方法与属性。下面我们就来对这些方法与属性做一下介绍。

**（1）normalize方法**

此方法用于将非标准路径的字符串转化成标准路径字符串，在转换过程中执行如下的操作

1、解析路径中的".."和"."字符串，返回解析后的标准路径。

2、将多个斜杠字符串转换为一个斜杠字符串，例如将"\\"转换为"\"。

3、将window操作系统中的反斜杠字符串转换为正斜杠字符串。

4、如果路径字符串以斜杠字符串结尾，则会在转换后的完整路径字符串末尾保留该斜杠字符串。

该方法的使用方式如下：

path.normalize(p)

在normalize方法中，使用一个参数，参数值为需要被转换的路径字符串。该方法返回被转换后的路径字符串。

var fs = require('fs');
var path = require('path');
var myPath = path.normalize(".//a//b//d//..//c/e//..//");
console.log(myPath);    //    a\b\c\

 

**（2）join方法**

该方法将多个参数值字符串结合成一个路径字符串，使用方式如下：

path.join([path1], [path2], [...])

在该方法中，可以使用一个或多个字符串值参数，该参数返回将这些字符串值参数结合而成的路径。

var joinPath = path.join(__dirname, 'a', 'b', 'c');
console.log(joinPath);      //   [D:\nodePro\fileTest\a\b\c](file:///D:/nodePro/fileTest/a/b/c)

 

__dirname变量值代表程序运行的根目录。

 

**（3）resolve方法**

该方法以应用程序根目录为起点，根据所有的参数值字符串解析出一个绝对路径。该方法的使用方式如下：

path.resolve(path1, [path2], [...])

在resolve方法中，可以指定一个或多个参数，每个参数值均为字符串。关于参数的选择参见课本或者是官方API

var resolve = path.resolve('a', 'b', 'c');
console.log(resolve);      //  [D:\nodePro\fileTest\a\b\c](file:///D:/nodePro/fileTest/a/b/c)

 

**（4）relative方法**

该方法用于获取两个路径之间的相对关系，使用方式如下：

path.relative(from , to);

在relative方法中使用两个参数，参数值均为一个路径，该路径可以是相对路径，也可以是绝对路径，可以为一个目录的路径，也可以为一个文件的路径。方法返回如果在代码中将第一个路径视为当前路径并使用相对路径来指定第二个路径时，应该使用的表达式。在window操作系统中这两条路径应该位于同一个硬盘分区中。否则方法直接返回第二个参数值的绝对路径。

var relative = path.relative('/fileTest/a/b/c', '/fileTest/china/shang');
console.log(relative);    //   ..\..\..\china\shang

 

**（5）dirname方法**

该方法用于获取一个路径中的目录名，使用方式如下：

path.dirname(p);

该方法使用一个参数，参数为一个路径可以是相对路径，绝对路径，可以为一个目录的路径，也可以为一个文件的路径。当参数值为目录路径时，该方法返回该目录的上层目录；当参数值为文件路径时，该方法返回该文件所在的目录。

var dirname = path.dirname("./a/b");
console.log(dirname);      //   .a

 

**（6）basename方法**

该方法用于获取一个路径中的文件名，使用方式如下：

path.basename(p, [ext]);

该方法包含两个参数，第一个参数p为必须指定的参数，ext参数为可选参数。p参数值必须为一个文件的完整路径，可以是相对路径，也可以使绝对路径。ext参数值用于在方法所返回的文件名中去掉文件的扩展名。因此该参数必须等于p参数值中指定的文件的扩展名（以“.”开始），否则不能去除该扩展名，该方法返回p参数中指定文件的文件名，当ext参数被指定后，该文件命中不包含文件扩展名。

var fileName = path.basename('./a/b.mess.txt');

console.log(fileName);      //   mess,txt

var name = path.basename('./a/b.mess.txt', '.txt');

console.log(name);     //   mess

 

**（7）extname方法**

该方法用于获取一个路径中的扩展名，使用方式如下：

path.extname(p)

该方法使用一个参数，参数值必须为一个文件的完整路径，可以为相对路径也可以为绝对路径。extname方法返回p参数值中指定文件的扩展名（以“.”开始），当p参数值中指定的文件没有指定扩展名，将会返回一个空字符串。

console.log(path.extname('foo/index.html'));     //  .html

 

**（8）path.sep属性**

属性值为操作系统指定的文件分隔符，可能的属性为“\\”（window操作系统中）或“/”（unix操作系统中）。

 

**（9）path.delimiter属性**

属性值为操作系统中指定的路径分隔符，可能的属性值为“;”（window操作系统中）或“:”（unix操作系统中）。