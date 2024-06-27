
const formatPrice = (amount: number): string => {
    return Intl.NumberFormat( "es-AR", {
        style: "currency",
        currency: "ARS"
    }).format(amount);
}

export default formatPrice;