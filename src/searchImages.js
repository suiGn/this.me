/**
 * Filters and displays images based on the user's search input.
 * It searches through the filenames of the images in each gallery.
 * The function is case-insensitive and matches any part of the filename.
 * 
 * @example
 * // Assuming there's an input field with id 'searchInput' and images in galleries.
 * // User types 'example' in the search input.
 * searchImages();
 * // Images with 'example' in their filenames will be displayed.
 */
function searchImages() {
    var input, filter, gallery, img, src, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    gallery = document.getElementsByClassName("gallery");

    for (var g = 0; g < gallery.length; g++) {
        img = gallery[g].getElementsByTagName("img");

        for (i = 0; i < img.length; i++) {
            src = img[i].src;
            var fileName = src.substring(src.lastIndexOf('/') + 1);
            if (fileName.toUpperCase().indexOf(filter) > -1) {
                img[i].style.display = "";
            } else {
                img[i].style.display = "none";
            }
        }
    }
}