import styles from "./Product.module.scss";
import clsx from "clsx";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { useState } from "react";
import shortid from "shortid";

const Product = ({ title, basePrice, name, size, colors }) => {
	const [currentColor, setCurrentColor] = useState(colors[0]);
	const [currentSize, setCurrentSize] = useState(size[0]);

	const prepareColorClassName = color => {
		return styles[
			"color" + color[0].toUpperCase() + color.substr(1).toLoweCase()
		];
	};
	const getPrice = () => {
		const foundSize = size.find(element => element.name === currentSize);
		return basePrice + foundSize.additionalPrice;
	};
	return (
		<article className={styles.product}>
			<div className={styles.imageContainer}>
				<img
					className={styles.image}
					alt='Kodilla shirt'
					src={`${process.env.PUBLIC_URL}/images/products/shirt-kodilla--black.jpg`}
				/>
			</div>
			<div>
				<header>
					<h2 className={styles.name}>{title}</h2>
					<span className={styles.price}>Price: {getPrice()}$</span>
				</header>
				<form>
					<div className={styles.sizes}>
						<h3 className={styles.optionLabel}>Sizes</h3>
						<ul className={styles.choices}>
							{size.map(size => (
								<li key={shortid()}>
									<button
										type='button'
										onClick={() => setCurrentSize(size.name)}
										className={clsx(
											currentSize === size.name && styles.active
										)}></button>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.colors}>
						<h3 className={styles.optionLabel}>Colors</h3>
						<ul className={styles.choices}>
							{colors.map(color => (
								<li key={shortid()}>
									<button
										type='button'
										onClick={() => setCurrentColor(color)}
										className={clsx(
											prepareColorClassName(color),
											currentColor === color && styles.active
										)}
									/>{" "}
								</li>
							))}
						</ul>
					</div>
					<Button className={styles.button}>
						<span className='fa fa-shopping-cart' />
					</Button>
				</form>
			</div>
		</article>
	);
};

/*Product.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	basePrice: PropTypes.number.isRequired,
	sizes: PropTypes.array.isRequired,
	colors: PropTypes.array.isRequired,
};*/

export default Product;
