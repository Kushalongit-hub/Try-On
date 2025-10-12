import React from 'react';
import { Product, ProductCategory } from './types';

// Icons
const LipstickIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.25 4.75L12 2.5 9.75 4.75m4.5 0v16.5m0-16.5l2.25 2.25M14.25 4.75L12 7M9.75 4.75L12 7m0 0v14.5m0-14.5L7.5 9.25m4.5-2.25L16.5 9.25"/></svg>
);
const GlassesIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M6 14h2m10 0h-2M6 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
);
const ShirtIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.75L4.75 9.25 9.25 12l2.75 9.25L14.75 12l4.5-2.75L12 4.75zM4.75 9.25V18.5h14.5V9.25"/></svg>
);

const createProducts = (items: Record<string, { type: Product['type'], value: string, imageUrl?: string }>): Product[] =>
    Object.entries(items).map(([name, { type, value, imageUrl }]) => ({ name, type, value, imageUrl: imageUrl || value }));

export const PRODUCT_CATEGORIES: Record<string, ProductCategory> = {
    makeup: {
        name: 'Makeup',
        icon: LipstickIcon,
        items: {
            'Lipstick': createProducts({
                'Crimson Red': { type: 'color', value: '#DC143C' }, 'Soft Pink': { type: 'color', value: '#FFB6C1' }, 'Deep Berry': { type: 'color', value: '#800020' }, 'Coral': { type: 'color', value: '#FF7F50' }, 'Mauve': { type: 'color', value: '#E0B0FF' },
                'Brick Red': { type: 'color', value: '#B22222' }, 'Golden Rose': { type: 'color', value: '#dda35d' }, 'Plum Purple': { type: 'color', value: '#DDA0DD' }, 'Classic Red': { type: 'color', value: '#FF0000' }, 'Matte Maroon': { type: 'color', value: '#800000' }
            }),
            'Eyeliner': createProducts({
                'Black Liquid': { type: 'style', value: 'Black Liquid' }, 'Brown Pencil': { type: 'style', value: 'Brown Pencil' }, 'Navy Gel': { type: 'style', value: 'Navy Gel' }, 'Burgundy Matte': { type: 'style', value: 'Burgundy Matte' }, 'Black Winged': { type: 'style', value: 'Black Winged' }, 
                'Bronze Shimmer': { type: 'style', value: 'Bronze Shimmer' }, 'Black Cat Eye': { type: 'style', value: 'Black Cat Eye' }, 'Charcoal Soft': { type: 'style', value: 'Charcoal Soft' }, 'Deep Brown': { type: 'style', value: 'Deep Brown' }, 'Black Metallic': { type: 'style', value: 'Black Metallic' }
            }),
            'Eye Shadow': createProducts({
                'Gold Shimmer': { type: 'color', value: '#FFD700' }, 'Silver Glitter': { type: 'color', value: '#C0C0C0' }, 'Bronze Matte': { type: 'color', value: '#CD7F32' }, 'Charcoal Smokey': { type: 'color', value: '#36454F' }, 'Rose Gold Sparkle': { type: 'color', value: '#E0BFB8' },
                'Copper Warm': { type: 'color', value: '#B87333' }, 'Ivory Shimmer': { type: 'color', value: '#FFFFF0' }, 'Plum Deep': { type: 'color', value: '#5A2D5A' }, 'Emerald Green': { type: 'color', value: '#50C878' }, 'Navy Blue': { type: 'color', value: '#000080' }
            }),
            'Foundation': createProducts({
                'Fair Light': { type: 'style', value: 'Fair Light' }, 'Fair Medium': { type: 'style', value: 'Fair Medium' }, 'Medium Warm': { type: 'style', value: 'Medium Warm' }, 'Medium Cool': { type: 'style', value: 'Medium Cool' }, 'Deep Olive': { type: 'style', value: 'Deep Olive' }, 
                'Deep Rich': { type: 'style', value: 'Deep Rich' }, 'Honey Golden': { type: 'style', value: 'Honey Golden' }, 'Warm Tan': { type: 'style', value: 'Warm Tan' }, 'Cool Beige': { type: 'style', value: 'Cool Beige' }, 'Porcelain': { type: 'style', value: 'Porcelain' }
            }),
        }
    },
    accessories: {
        name: 'Accessories',
        icon: GlassesIcon,
        items: {
            'Sunglasses': createProducts({
                'Aviator Black': { type: 'image', value: 'https://i.ibb.co/hZ5XyP5/aviator-black.png' }, 'Cat-Eye Brown': { type: 'image', value: 'https://i.ibb.co/9gX6pWj/cateye-brown.png' }, 'Wayfarer Black': { type: 'image', value: 'https://i.ibb.co/GWBf9bV/wayfarer-black.png' }, 'Round Gold': { type: 'image', value: 'https://i.ibb.co/n6zV8qg/round-gold.png' }, 'Oversized Black': { type: 'image', value: 'https://i.ibb.co/h8GjC2x/oversized-black.png' },
                'Clubmaster Tortoise': { type: 'image', value: 'https://i.ibb.co/P9zY52M/clubmaster-tortoise.png' }, 'Pilot Silver': { type: 'image', value: 'https://i.ibb.co/L8B5R3S/pilot-silver.png' }, 'Square Rose Gold': { type: 'image', value: 'https://i.ibb.co/2d1h4vj/square-rosegold.png' }, 'Retro Green': { type: 'image', value: 'https://i.ibb.co/2tV4YvP/retro-green.png' }, 'Shield Style Purple': { type: 'image', value: 'https://i.ibb.co/2K21yqK/shield-purple.png' }
            }),
             'Glasses': createProducts({
                'Classic Black Frame': { type: 'image', value: 'https://i.ibb.co/7C9Cwhh/classic-black.png' }, 'Rose Gold Frame': { type: 'image', value: 'https://i.ibb.co/Kqw1K4b/rosegold-frame.png' }, 'Clear Frame': { type: 'image', value: 'https://i.ibb.co/QvW4kM2/clear-frame.png' }, 'Tortoise Shell': { type: 'image', value: 'https://i.ibb.co/2Zd7WjP/tortoise-shell.png' }, 'Cat-Eye Blue': { type: 'image', value: 'https://i.ibb.co/qBjTRws/cateye-blue.png' },
                'Rectangular Silver': { type: 'image', value: 'https://i.ibb.co/z5pB01M/rectangular-silver.png' }, 'Round Gold Glasses': { type: 'image', value: 'https://i.ibb.co/GdzCgY7/round-gold-glasses.png' }, 'Wayfarer Brown': { type: 'image', value: 'https://i.ibb.co/KjprZ3x/wayfarer-brown.png' }, 'Oversized Black Glasses': { type: 'image', value: 'https://i.ibb.co/5cPHL0g/oversized-black-glasses.png' }, 'Minimalist Clear': { type: 'image', value: 'https://i.ibb.co/yY1hS3J/minimalist-clear.png' }
            }),
            'Hair Accessories': createProducts({
                'Hair Clip Gold': { type: 'image', value: 'https://i.ibb.co/gPG2nLp/hairclip-gold.png' }, 'Hair Band Silver': { type: 'image', value: 'https://i.ibb.co/ZJ9qXWf/hairband-silver.png' }, 'Headband Black': { type: 'image', value: 'https://i.ibb.co/8Yj02xV/headband-black.png' }, 'Pearl Hair Clip': { type: 'image', value: 'https://i.ibb.co/XjH3G8Y/pearl-clip.png' }, 'Gold Geometric Clip': { type: 'image', value: 'https://i.ibb.co/hWkR9fc/geometric-clip.png' },
                'Velvet Hair Band Red': { type: 'image', value: 'https://i.ibb.co/1Mj03q4/velvet-band.png' }, 'Crystal Hair Pin': { type: 'image', value: 'https://i.ibb.co/d2xVz0Y/crystal-pin.png' }, 'Leather Hair Band': { type: 'image', value: 'https://i.ibb.co/mB1T9V9/leather-band.png' }, 'Floral Hair Accessory': { type: 'image', value: 'https://i.ibb.co/f4N0ZcM/floral-accessory.png' }, 'Metal Comb Gold': { type: 'image', value: 'https://i.ibb.co/wK5VpP9/metal-comb.png' }
            }),
        }
    },
    clothing: {
        name: 'Clothing',
        icon: ShirtIcon,
        items: {
            'Shirts/Tops': createProducts({
                'Classic White Tee': { type: 'image', value: 'https://i.ibb.co/6yFHKf6/white-tee.png' }, 'Black Polo': { type: 'image', value: 'https://i.ibb.co/9vM7fzX/black-polo.png' }, 'Denim Shirt Blue': { type: 'image', value: 'https://i.ibb.co/bFqYx5v/denim-shirt.png' }, 'Striped Casual': { type: 'image', value: 'https://i.ibb.co/Wc2zVz2/striped-shirt.png' }, 'Oversized Sweater Gray': { type: 'image', value: 'https://i.ibb.co/Qk4WSPn/gray-sweater.png' },
                'Pink Crop Top': { type: 'image', value: 'https://i.ibb.co/GVCy1qG/pink-crop.png' }, 'Burgundy Button-Up': { type: 'image', value: 'https://i.ibb.co/K502XFf/burgundy-shirt.png' }, 'Vintage Band Tee': { type: 'image', value: 'https://i.ibb.co/s5M4M2L/band-tee.png' }, 'Cream Silk Blouse': { type: 'image', value: 'https://i.ibb.co/wJ28dGg/silk-blouse.png' }, 'Black Leather Top': { type: 'image', value: 'https://i.ibb.co/G58C4kt/leather-top.png' }
            }),
            'Dresses': createProducts({
                'Little Black Dress': { type: 'image', value: 'https://i.ibb.co/M8VpW46/black-dress.png' }, 'Summer Floral': { type: 'image', value: 'https://i.ibb.co/zX8s8D7/floral-dress.png' }, 'Casual Blue Denim': { type: 'image', value: 'https://i.ibb.co/SJVfWzY/denim-dress.png' }, 'Elegant Maroon': { type: 'image', value: 'https://i.ibb.co/Qc5T7b2/maroon-dress.png' }, 'Sequin Gold': { type: 'image', value: 'https://i.ibb.co/z4yY3sW/sequin-dress.png' },
                'Bohemian Printed': { type: 'image', value: 'https://i.ibb.co/j3fFq7R/boho-dress.png' }, 'Classic White': { type: 'image', value: 'https://i.ibb.co/mXdbf47/white-dress.png' }, 'Evening Red': { type: 'image', value: 'https://i.ibb.co/Yy4Vq2C/red-dress.png' }, 'Casual Green': { type: 'image', value: 'https://i.ibb.co/yqgZ3G5/green-dress.png' }, 'Formal Navy Gown': { type: 'image', value: 'https://i.ibb.co/Mhcx0Yd/navy-gown.png' }
            }),
            'Jackets': createProducts({
                'Black Leather Jacket': { type: 'image', value: 'https://i.ibb.co/L6VphfP/leather-jacket.png' }, 'Denim Jacket Blue': { type: 'image', value: 'https://i.ibb.co/x74rBfL/denim-jacket.png' }, 'Blazer Gray': { type: 'image', value: 'https://i.ibb.co/zfhbB6W/gray-blazer.png' }, 'Bomber Jacket Navy': { type: 'image', value: 'https://i.ibb.co/P48N2Mf/bomber-jacket.png' }, 'Cardigan Beige': { type: 'image', value: 'https://i.ibb.co/hZ6YhG0/beige-cardigan.png' },
                'Puffer Jacket Black': { type: 'image', value: 'https://i.ibb.co/xYq0gVn/puffer-jacket.png' }, 'Suede Jacket Brown': { type: 'image', value: 'https://i.ibb.co/gPSc1Gv/suede-jacket.png' }, 'Vintage Denim Light': { type: 'image', value: 'https://i.ibb.co/3s8sBmt/vintage-denim.png' }, 'Formal Blazer Charcoal': { type: 'image', value: 'https://i.ibb.co/b3w1Xk7/charcoal-blazer.png' }, 'Oversized Jacket Cream': { type: 'image', value: 'https://i.ibb.co/GnmT4hV/cream-jacket.png' }
            }),
        },
    }
};
