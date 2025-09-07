import React from 'react';

interface StarRatingProps {
  rating: number;
  selectedColor?: string;
}

const StarIcon = ({ color }: { color: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={color}>
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 9.306l8.332-1.151L12 .587z"/>
    </svg>
);


const StarRating: React.FC<StarRatingProps> = ({ rating, selectedColor = 'text-yellow-400' }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} color={selectedColor} />)}
            {/* Note: Half star display is omitted for simplicity but could be added with a different SVG icon */}
            {[...Array(emptyStars + (halfStar ? 1 : 0))].map((_, i) => <StarIcon key={`empty-${i}`} color="text-gray-300" />)}
        </div>
    );
};

export default StarRating;
