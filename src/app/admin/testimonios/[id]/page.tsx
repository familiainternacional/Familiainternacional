import React from 'react';
import TestimonialEditor from '../TestimonialEditor';
import { getTestimonialById } from '../actions';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Editar Testimonio | Panel de Control',
};

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await getTestimonialById(params.id);

  if (!testimonial) {
    notFound();
  }

  return <TestimonialEditor testimonial={testimonial} />;
}
