import React from 'react';
import { PantryList } from '../components/pantry/PantryList';

export const PantryPage: React.FC = () => {
    return (
        <div className='container mt-4'>
            <PantryList />
        </div>
    );
};
