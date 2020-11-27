/*$(document).ready(function () {
    $(".showHideMenu").click(function () {
        if ($(".dropdown").is(":hidden")) {
            $('.closemenu').show();
            $(".dropdown").slideDown(180);
        } else {
            $('.closemenu').hide();
            $(".dropdown").slideUp(180);
        }
        return false;
    });
    $(".dropdown a").click(function (e) {
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(aid).offset().top},'fast');
        $('.closemenu').hide();
        $(".dropdown").slideUp(180);
    });
    $("input").click(function () {
      $( this ).siblings().css( "display", "inline-block" );
      return false;
  });
});*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

const sections = document.querySelectorAll(".item-wrap");
const title = document.getElementById("section_ddl");
console.log(title);  

function updateTitleFor(section) {
  console.log("wtf");
  if(section.querySelector("h1")){
    title.innerText = section.querySelector("h1").innerText;
  }  
}

const visibleSections = new Map();
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    entry.target.querySelectorAll(".ratio").forEach(r => r.innerText = entry.intersectionRatio);
    if (entry.isIntersecting) {
      visibleSections.set(entry.target, entry.intersectionRatio);
    } else {
      visibleSections.delete(entry.target);
    }
  });

  let max = -1;
  let mostVisibleSection = null;
  for (const section of sections) {
    const intersectionRatio = visibleSections.get(section)
    if (intersectionRatio && intersectionRatio > max) {
      max = intersectionRatio;
      mostVisibleSection = section;
    }
  }
  updateTitleFor(mostVisibleSection);
}, {
  threshold: [0, 0.25, 0.5, 0.75, 1],
});

for (const section of sections) {
  observer.observe(section);
}
