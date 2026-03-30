const stripe = require("stripe")("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");

module.exports = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Missing amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Airport Chauffeur Service",
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: "https://montrealmetropolitanairportlimoservice.com/success",
      cancel_url: "https://montrealmetropolitanairportlimoservice.com/cancel",

      metadata: {
        source: "airport-metropolitan",
      },
    });

    res.status(200).json({ url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
