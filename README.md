# Tag Generator
### Contains two applications to make vault preparation easier based on the Purchase Order .csv :
1. A Tag Generator which creates a tag for each product within the purchase order, each tag includes: Name (Highlighted based on category), Barcode of the SKU, the SKU.
2. A PO Summarizer which sorts all incoming products into a list separated by categories, sorted alphabetically . Optional configurations include: separating Flower based on size (3.5g 7g, 14g, 28g),  WIP.

TODO:

1. ~~Refactor app.js to functions instead of just one long script~~
2. Sort by category than alphabetical based on producer.
3. Option to sort by brand instead
4. ~~Separate Infused PR from Non-Infused~~
5. Sort flower by size (3.5g, 7g, 14g, 15g, 28g)
6. ~~Get colors for category highlighting~~
7. ~~Possibly add barcode option (although scanning has never been used in my experience)~~
8. Test with 3 and 4 line product names (aka very long product names)
9. ~~Add a print button~~
10. ~~Add a header~~
11. Possibly a modal/intro page
12. Footer?
13. Don't trim the first 15 lines
14. Color picker for categories/subcategories
15. Introduction text where main tag document is "No Purchase Order Loaded..." or something similar

BUGS:

1. ~~Clicking generate multiple times doesn't create a new set of tags but instead appends to the end.~~
2. ~~Have to refresh to generate a new report~~
