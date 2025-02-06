function abTestingMiddleware(req, res, next) {
    // Simulerte A/B-testing: tilfeldig tilordne en variant
    const variants = ["A", "B"];
    const userVariant = variants[Math.floor(Math.random() * variants.length)];

    // Legg til varianten i forespørselen
    req.abVariant = userVariant;
    
    console.log(`User assigned to variant: ${userVariant}`);
    next();
}

module.exports = abTestingMiddleware;
