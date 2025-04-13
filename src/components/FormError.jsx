import { AlertCircle } from 'lucide-react';

export const FormError = ({ message } ) => {
	if ( !message ) return null;

	return (
		<div className='bg-destructive/25 flex items-center gap-2 text-xs text-secondary-foreground p-3 mb-2'>
			<AlertCircle className='w-4 h-4' />
			<p>{ message }</p>
		</div>
	);
}