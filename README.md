# Tag Generator
### Contains two applications to make vault preparation easier based on the Purchase Order .csv :
1. A Tag Generator which creates a tag for each product within the purchase order, each tag includes: Name (Highlighted based on category), Barcode of the SKU, the SKU.
2. A PO Summarizer which sorts all incoming products into a list separated by categories, sorted alphabetically . Optional configurations include: separating Flower based on size (3.5g 7g, 14g, 28g),  WIP.

TODO:
Refactor app.js to functions instead of just one long script
Sort by category than alphabetical based on producer.
Option to sort by brand instead
Separate Infused PR from Non-Infused DONE
Sort flower by size (3.5g, 7g, 14g, 15g, 28g)
Get colors for category highlighting
Possibly add barcode option (although scanning has never been used in my experience)
Test with 3 and 4 line product names (aka very long product names)
Add a print button
Add a header
Possibly a modal/intro page
footer??? with a tip option....? LOL
Don't trim the first 15 lines
color picker for categories/subcategories


BUGS:
Clicking generate multiple times doesn't create a new set of tags but instead appends to the end. FIXED
Have to refresh to generate a new report
