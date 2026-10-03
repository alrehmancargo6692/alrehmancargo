'use client';
import { useEffect } from 'react';
export default function Register(){useEffect(()=>{if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(registration=>registration.update()).catch(()=>{})},[]);return null}
