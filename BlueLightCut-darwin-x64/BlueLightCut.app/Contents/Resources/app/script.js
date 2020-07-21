// 合言葉
var watchword = 'qqqqq12345';

function load() {
  setTimeout(function () {
    var config = {
      apiKey: "AIzaSyCZ7Xrroa0yGcbORBnrB6xGtBEr3REKsn4",
      authDomain: "comets-67d18.firebaseapp.com",
      databaseURL: "https://comets-67d18.firebaseio.com",
      projectId: "comets-67d18",
      storageBucket: "comets-67d18.appspot.com",
      messagingSenderId: "850717384208"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      firebase.auth().signInAnonymously();
    } else {
      alert("すでに別なfirebaseアプリが定義されているためcometsを利用出来ません");
    }

    var cssfile = $("<link>", {
      href: "https://comets.nabettu.com/presenter/style.css",
      type: "text/css",
      rel: "stylesheet"
    });
    $("body").append(cssfile);

    var wrapperDom = $("<div></div>", {
      id: "comets"
    });
    var setupedTextDom = $("<p></p>", {
      addClass: "status"
    }).text("comets is ready");

    if ($(".punch-full-screen-element").length) {
      $(".punch-full-screen-element").append(wrapperDom);
    } else {
      $("body").append(wrapperDom);
    }
    wrapperDom.append(setupedTextDom);

    wrapperReset = function () {
      setTimeout(function () {
        console.log("reset");
        wrapperDom.remove();
        if ($(".punch-full-screen-element").length) {
          $(".punch-full-screen-element").append(wrapperDom);
        } else {
          $("body").append(wrapperDom);
        }
        $("#comets").css("font-size", $(window).height() / 12 + "px");
      }, 1500);
    };

    $("#punch-start-presentation-left").on("click", function () {
      wrapperReset();
    });

    $(window).on("resize", function (e) {
      wrapperReset();
    });

    $(window).keydown(function (e) {
      if (event.shiftKey && event.metaKey) {
        if (e.keyCode === 13) {
          wrapperReset();
          return false;
        }
      }
    });

    // while (!watchword) {
    //   var watchword = prompt("コメントを受け取る合言葉を入力して下さい", "");
    // }
    aud_uri = 'https://comets.nabettu.com/?id=' + watchword;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(aud_uri);
    }

    var dbref = firebase.database().ref("comment/" + watchword);
    dbref.set(null).then(e => {
      dbref.on("child_added", commentSnapShot => {
        var commentText = commentSnapShot.val().text;
        var id = commentSnapShot.key;
        var commentDom = $("<p></p>", {
          addClass: "comment",
          id: id
        })
          .text(commentText)
          .css({
            top: Math.random() * 90 + "%"
          });
        $("#comets").append(commentDom);
        setTimeout(
          function (id) {
            $("#comets #" + id).remove();
          },
          10000,
          id
        );
      });

      dbref.push({
        text: "comets setup done!"
      });
    });
  }, 1000);
}
