Tasty
=====
A minimal Delicious Library 3 site template with search facility.

I've fiddled with publishing templates for DL on and off since 2013 or something, this is the closest I ever got to finishing one. I don't have a Mac at home any more, so it's abandonware now (just like Delicious Library!), but if you want it, you're welcome to it.

Installing
----------
Requires Delicious Library 3. Tested with 3.7.

1. Download and unzip
2. Open Delicious Library 3, and go to the publishing view
3. Right-click the template list, go to "Open Templates Directory"
4. Copy the "tasty.libraryhtmltemplate" folder into this directory
5. Close and reopen Delicious Library
6. It should appear in list (go left/right using keyboard, the visual listing is a bit odd)
6. Change the selected template to "Tasty"
7. Export!

TODO
----
- The lazy loading images code seems a bit temperamental

Contributing
------------
If you want to make your own theme based on this one, or even fix it, feel free to fork the code or submit pull requests.

Tips for making DL themes
-------------------------
- The templating system is very finickity and objects to lots of things. That's why the horrible table layout and occasionally weird structure to files.
- Live preview in Delicious Library can really help (if you do something it doesn't like it's more immediately obvious), but you need to scroll up and down sometimes to give it a poke into working.
- Sometimes Delicious gives you errors! But not anywhere you'd notice. They're in Console.app if you look though.
- You can find the bundled default templates in: `app bundle - show package contents - Contents -> Resources -> Templates`
- There's a full list of supported fields in this repository.
- If your template doesn't work:
    + Is the theme untitled? check template strings
    + Does the theme not appear at all? check file structure (it shouldn't have any unexpected files)
    + Preview fails/no HTML files published? problem is in index.html template...good luck
- Other resources:
    + https://github.com/natedillon/dl-template-docs
    + https://github.com/junap/ex-libris
    + https://github.com/natedillon/nateandjermaine.libraryhtmltemplate
    + https://github.com/NeilDobson/deliciousExport