const pool = require("../../db");

const seedProducts = async (req, res) => {
  try {
    const products = [
      {
        name: "Underwater World",
        description:
          "An underwater theme cake, decorated with fondant sea creatures, ship, and diver boy!",
        sizes: {
          "6 inch": 99,
          "8 inch": 139,
          "2 tier 6 + 4 inch": 149,
          "2 tier 8 + 6 inch": 239,
        },
        img: "https://i.postimg.cc/VN1L3pFm/1-ADA4-ED7-A1-A1-4-C9-D-A34-E-24-A3-FB6456-B7.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Into Space Cupcakes",
        description:
          "Space theme cupcakes - topped with buttercream, fondant rockets, moons and stars.",
        sizes: {
          "6 pcs": 18,
          "12 pcs": 38,
        },
        img: "https://i.postimg.cc/Fz2hGBRt/26a18227-0940-41b1-a977-ba726601c290.jpg",
        type: "Cupcakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Zoo Theme Bus",
        description:
          "A zoo theme bus cake. 3D bus coated with fondant, topped with animal figurines.",
        sizes: {
          "6 inch": 288,
          "8 inch": 398,
        },
        img: "https://i.postimg.cc/W1c2kCCg/487-EE0-B1-308-E-43-B0-8-FDF-700337-F695-D8.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Gotta Catch Em!",
        description: "A pokemon cake. Gotta Catch 'em all!",
        sizes: {
          "6 inch": 79,
          "8 inch": 129,
          "2 tier 6 + 4 inch": 139,
          "2 tier 8 + 6 inch": 219,
        },
        img: "https://i.postimg.cc/9QPct1HS/51491850-FDA5-4605-959-E-6-E87723-A2-A09.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Christmas Baby",
        description:
          "Christmas theme cake with a fondant baby girl, dressed up and all ready for the jingle bells!",
        sizes: {
          "6 inch": 129,
          "8 inch": 189,
          "2 tier 6 + 4 inch": 169,
          "2 tier 8 + 6 inch": 239,
        },
        img: "https://i.postimg.cc/MTpZGB4L/6-D25-DBE8-BCE0-489-A-BD53-58-CD459-B484-C.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Once upon a Unicorn",
        description:
          "Pastel unicorn cake. Frosted with pastel watercolours and a lovely fondant unicorn. ",
        sizes: {
          "6 inch": 99,
          "8 inch": 139,
          "2 tier 6 + 4 inch": 149,
          "2 tier 8 + 6 inch": 239,
        },
        img: "https://i.postimg.cc/xj7j0cPs/77-C0-ADDC-E672-47-D4-B229-8-E4-DA35-FDC4-B.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Channel Style Ribbon Cake",
        description: "Channel Style Ribbon Cake with fondant flowers",
        sizes: {
          "6 inch": 89,
          "8 inch": 129,
          "2 tier 6 + 4 inch": 139,
          "2 tier 8 + 6 inch": 229,
        },
        img: "https://i.postimg.cc/pd2R082d/80094466-0969-469-A-822-B-3-EF34-F6-C76-B5.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Unicorn Candy Castle",
        description:
          "2 tier Candy Castle cake with rainbow, fondant unicorns and girl riding a unicorn.",
        sizes: {
          "2 tier 8 + 6 inch": 588,
        },
        img: "https://i.postimg.cc/nzSF9zfh/9-DD23766-EE90-4-B9-A-B3-EB-AA325-F2044-F8.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Paw Patrol",
        description: "Paw Patrol cake with fondant figurines",
        sizes: {
          "6 inch": 588,
          "8 inch": 788,
        },
        img: "https://i.postimg.cc/rmM0NzHG/CA9-B8-D00-E27-B-4547-AF65-CFEC222-DA971.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Peaceful Yoga",
        description:
          "A yoga theme cake - fondant girl practing yoga , decorated with floral rosette pipings.",
        sizes: {
          "6 inch": 139,
          "8 inch": 189,
          "2 tier 8 + 6 inch": 279,
        },
        img: "https://i.postimg.cc/854FKN82/E507-BC85-3-F61-4-CF9-A58-A-9-E14-A4030952.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Squid Game",
        description:
          "Squid Game theme cake with fondant figurines of the charcters.",
        sizes: {
          "2 tier 8 + 6 inch": 588,
        },
        img: "https://i.ibb.co/X7FvZpz/Snapseed.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Hamster bento",
        description: "Hamster design oval bento",
        sizes: {
          "4 inch": 48,
        },
        img: "https://i.ibb.co/gSkRqHc/IMG-9739.jpg",
        type: "Bento Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Shin Chan Cupcakes",
        description:
          "Cupcakes topped with butter cream, and fondant 2D Shin Chan character",
        sizes: {
          "6 pcs": 38,
          "12 pcs": 68,
        },
        img: "https://i.ibb.co/b1VjR96/IMG-9740.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Korean style heart cake",
        description:
          "Korean style heart shaped cake with vintage border pipings.",
        sizes: {
          "6 inch": 69,
          "8 inch": 119,
        },
        img: "https://i.ibb.co/9ThqPnG/Snapseed-1.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Fuzzy Bear",
        description: "A handpiped fluffy bear cake!",
        sizes: {
          "6 inch": 69,
          "8 inch": 119,
        },
        img: "https://i.ibb.co/sR7vD3k/Snapseed-2.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Rustic Animal Cake",
        description:
          "Rustic design cake with reindeer, bunny and racoon animal fondant figurines.",
        sizes: {
          "6 inch": 169,
          "8 inch": 219,
          "2 tier 6 + 4 inch": 229,
          "2 tier 8 + 6 inch": 369,
        },
        img: "https://i.ibb.co/qC88ct1/Snapseed-3.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Empress style cake",
        description: "A longetivity cake in Empress design.",
        sizes: { "6 inch": 149 },
        img: "https://i.ibb.co/kmFpZQB/Snapseed-5.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Kuromi Cake",
        description:
          "3D Fondant Kuromi sitting on a pink cake decorated with party borders and heart shapes",
        sizes: { "6 inch": 199, "8 inch": 269 },
        img: "https://i.ibb.co/NSvHhDD/Snapseed-6.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Gender Reveal Bear Cake",
        description: "And pink and blue cake - cut to reveal the gender!",
        sizes: { "6 inch": 129, "8 inch": 179 },
        img: "https://i.ibb.co/Lvf316f/Snapseed-7.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Pooh & Friends",
        description:
          "Winnie The Pooh and friends cake! All figurines are handcrafted with fondant.",
        sizes: { "2 tier 8 + 6 inch": 588 },
        img: "https://i.ibb.co/xY8W3Wf/IMG-6378.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Snow White",
        description:
          "Snow White Toy figurine cake with vintage buttercream border pipings.",
        sizes: { "6 inch": 109, "8 inch": 159 },
        img: "https://i.ibb.co/ZSY3hS2/IMG-6631.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Happy Little Fruits",
        description: "A fruit theme cake decorated in fondant.",
        sizes: { "6 inch": 159, "8 inch": 229 },
        img: "https://i.ibb.co/FX2JDy3/IMG-6654.jpgg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Guitar Musical Cake",
        description:
          "Musical theme cake decorated with musical notes, fondant guitar and gold balls.",
        sizes: { "4 inch": 69, "6 inch": 119, "8 inch": 169 },
        img: "https://i.ibb.co/f1s1Jpf/Snapseed-4.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Papa drawing cake",
        description:
          "Surprise your papa with this buttercream drawing papa bento cake!",
        sizes: { "4 inch": 38 },
        img: "https://i.ibb.co/f2Wmh1M/IMG-7762.jpg",
        type: "Bento Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Yoga drawing Cake",
        description:
          "A bento cake with buttercream drawing of a girl doing yoga.",
        sizes: { "4 inch": 49 },
        img: "https://i.ibb.co/G9CKW1v/IMG-8021.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Lego and Knight",
        description:
          "Decorated with fondant lego blocks and a knight figurine.",
        sizes: { "6 inch": 149, "8 inch": 189 },
        img: "https://i.ibb.co/2FhZvQS/IMG-7955.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Motorist Bento",
        description: "Bento cake with buttercream motorist drawing.",
        sizes: { "4 inch": 58 },
        img: "https://i.ibb.co/7Sp3s33/IMG-2484.jpg",
        type: "Bento Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Happy Birthday Mummy",
        description:
          "Bento cake with a drawing of 2 sisters celebrating for Mummy!",
        sizes: { "4 inch": 58 },
        img: "https://i.ibb.co/VCDDJgS/IMG-2531.jpg",
        type: "Bento Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Wedding Bride",
        description:
          "A wedding theme bride cake. A White Cake with vintage pipings and a fondant bride with wedding dress and flower",
        sizes: { "6 inch": 149 },
        img: "https://i.ibb.co/qRCczP7/IMG-2576.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Oh Baby! Bear Cake",
        description:
          "Mama and baby bear cake design - Bear fondant figurines, gold and white ball toppers and a Oh Baby words topper at the front.",
        sizes: { "4 inch": 149, "6 inch": 189 },
        img: "https://i.ibb.co/LZJXQ3s/IMG-8814.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Cocomelon Cupcakes",
        description:
          "Cupcakes frosted with buttercream and topped with handcrafted 2D cocomelon fondant.",
        sizes: { "6 pcs": 38, "12 pcs": 68 },
        img: "https://i.ibb.co/YLnr4j5/IMG-9078.jpg",
        type: "Cupcakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Minimalist Drawing Bento",
        description: "Minimalist Drawing bento",
        sizes: { "4 inch": 58 },
        img: "https://i.ibb.co/MSCpnw9/IMG-9448.jpg",
        type: "Bento Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Party, Beer and Games! Cupcakes",
        description:
          "Cupcakes frosted with buttercream and topped with party, beer and playstation fondant",
        sizes: { "6 pcs": 38, "12 pcs": 68 },
        img: "https://i.ibb.co/XzzYQmz/IMG-9500.jpg",
        type: "Cupcakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Animals theme cake",
        description: "Safari themed cake with fondant animal figurines.",
        sizes: {
          "6 inch": 189,
          "8 inch": 229,
          "2 tier 6 + 4 inch": 239,
          "2 tier 8 + 6 inch": 379,
        },
        img: "https://i.ibb.co/qRCczP7/IMG-2576.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Super Mario theme cake",
        description:
          "A Super Mario theme cake decorated with fondant and toy toppers.",
        sizes: { "6 inch": 189, "8 inch": 249 },
        img: "https://i.ibb.co/sW51ZJ0/IMG-3075.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Christmas Cupcakes",
        description:
          "A set of Christmas Cupcakes - buttercream pipings, and fondant gingerbread man, santa claus, reindeer and snowman.",
        sizes: { "12 pcs": 88 },
        img: "https://i.ibb.co/z5fkR8h/IMG-5869.jpg",
        type: "Cupcakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Vintage Heart Cake",
        description:
          "A heart shaped cake with vintage pipings and little rosettes",
        sizes: { "6 inch": 89, "8 inch": 129 },
        img: "https://i.ibb.co/m0Z9H3j/IMG-5051.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Stella Lou and Shellie May",
        description:
          "A Stella Lou and Shellie May fondant figurine twin cake connected with a rainbow and decorated with clouds and stars ",
        sizes: { "4 inch x 2": 288 },
        img: "https://i.ibb.co/djmZNLK/IMG-0593.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Happy Beier Day Bento",
        description: "Cute little bento with 2 bears in buttercream drawing.",
        sizes: { "4 inch": 42 },
        img: "https://i.ibb.co/mBFPYrM/IMG-0357.jpg",
        type: "Bento Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "3D cool rich dad cake",
        description:
          "3D dad cake with wife and daughter, lovely home and money bags in fondant.",
        sizes: { "6 inch": 228 },
        img: "https://i.ibb.co/ncGyDqV/IMG-1361.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Christian Dior style Ribbon Cake",
        description:
          "Quilted design Christian Dior style cake with pearls, fondant ribbon and flowers.",
        sizes: { "6 inch": 128, "8 inch": 188 },
        img: "https://i.ibb.co/ncGyDqV/IMG-1361.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },
      {
        name: "Longetivity Swan Cake",
        description:
          "Longetivity Cake with ombre navy swirls, fondant sakura, swan and longetivty buns. ",
        sizes: { "6 inch": 128, "8 inch": 188 },
        img: "https://i.ibb.co/ncGyDqV/IMG-1361.jpg",
        type: "Custom Cakes",
        flavours: ["Chocolate", "Vanilla", "Strawberry"],
      },

      // Add more products as needed
    ];

    // Clear existing products (optional)
    await pool.query("DELETE FROM products");

    // Insert products
    for (const product of products) {
      await pool.query(
        "INSERT INTO products (name, description, sizes, img, type, flavours) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          product.name,
          product.description,
          JSON.stringify(product.sizes),
          product.img,
          product.type,
          product.flavours,
        ]
      );
    }

    res.status(200).send("Products seeded successfully!");
  } catch (err) {
    console.error("Error seeding products:", err);
    res.status(500).send("Error seeding products.");
  }
};

module.exports = { seedProducts };
