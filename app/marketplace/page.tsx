'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    Search, 
    CheckCircle, 
    Eye, 
    Loader2, 
    Star, 
    Plus, 
    Filter,
    Droplets,
    Sun,
    Activity
} from 'lucide-react';

// --- BASE DE DATOS LOCAL SINCRONIZADA (40 Especies - Precios tope $450) ---
const plantasData = [
    { "id": 1, "nombre": "Monstera Deliciosa", "nombreCientifico": "Monstera deliciosa", "precio": 450, "categoria": "Interior", "imagen": "https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800", "cuidados": { "riego": "Mod", "luz": "Ind", "dificultad": "Fácil" } },
    { "id": 2, "nombre": "Sansevieria", "nombreCientifico": "Dracaena trifasciata", "precio": 280, "categoria": "Resistente", "imagen": "https://images.pexels.com/photos/5858235/pexels-photo-5858235.jpeg?auto=compress&cs=tinysrgb&w=800", "cuidados": { "riego": "Bajo", "luz": "Todo", "dificultad": "M. Fácil" } },
    { "id": 3, "nombre": "Poto (Epipremnum)", "nombreCientifico": "Epipremnum aureum", "precio": 190, "categoria": "Colgante", "imagen": "https://images.pexels.com/photos/7663986/pexels-photo-7663986.jpeg?auto=compress&cs=tinysrgb&w=800", "cuidados": { "riego": "Mod", "luz": "Med", "dificultad": "Fácil" } },
    { "id": 4, "nombre": "Echeveria Blue", "nombreCientifico": "Echeveria elegans", "precio": 120, "categoria": "Suculenta", "imagen": "https://imgs.search.brave.com/NwSxXgXfZtpjexI9LS1mbN8zSS8QMpT73t-2RjT5cPU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxNDYyMzM2L3Iv/aWwvNGIyZDM2LzM1/ODQ0OTA3NDAvaWxf/NjAweDYwMC4zNTg0/NDkwNzQwX3JkYXgu/anBn", "cuidados": { "riego": "M.Bajo", "luz": "Sol", "dificultad": "Fácil" } },
    { "id": 5, "nombre": "Ficus Lyrata", "nombreCientifico": "Ficus lyrata", "precio": 450, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/r8N-mD2EtDGNfl_CWQ8CAMU2aPNy8EGQrldWsJKDpac/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVycGxhbnQuZXMv/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MTAvZmljdXMtbHly/YXRhLWwtMzAweDM3/NS5qcGc", "cuidados": { "riego": "Mod", "luz": "Ind", "dificultad": "Media" } },
    { "id": 6, "nombre": "Cactus de Asiento", "nombreCientifico": "Echinocactus grusonii", "precio": 320, "categoria": "Exterior", "imagen": "https://imgs.search.brave.com/5IxequsIpjXtc4RKqvMtObSmnyZZCrOt8N__1EDmYUY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jYWN0/dXNvbmxpbmUuZXMv/Y2RuL3Nob3AvZmls/ZXMvRFNDMDM3ODcu/anBnP3Y9MTc3NDAx/MzgyOCZ3aWR0aD0x/NDQ1", "cuidados": { "riego": "Min", "luz": "Sol", "dificultad": "M. Fácil" } },
    { "id": 7, "nombre": "Helecho Boston", "nombreCientifico": "Nephrolepis exaltata", "precio": 250, "categoria": "Humedad", "imagen": "https://imgs.search.brave.com/dsA-8NEkwgSPGreKxpGIpo6cUMMf8Ino8QINL6UCOaI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9seXJh/dGEuY29tL2Nkbi9z/aG9wL2ZpbGVzL0hF/TEVDSE9fQk9TVE9O/X05FR1JPX1NVUF9N/QVBMRS5qcGc_dj0x/NzY1MjE0NTc3Jndp/ZHRoPTE0NDU", "cuidados": { "riego": "Freq", "luz": "Som", "dificultad": "Media" } },
    { "id": 8, "nombre": "Palma Areca", "nombreCientifico": "Dypsis lutescens", "precio": 430, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/o9oQCZzCKPabnCnsD9LDdwxhkT81PPcj387JwjnRCcU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jaGFw/b21hcnQuY29tLm14/LzM2NDctaG9tZV9k/ZWZhdWx0L3BhbG1h/LWFyZWNhLTE4MGNt/LWRlLWFsdHVyYS5q/cGc", "cuidados": { "riego": "Reg", "luz": "Bril", "dificultad": "Media" } },
    { "id": 9, "nombre": "Lirio de la Paz", "nombreCientifico": "Spathiphyllum", "precio": 310, "categoria": "Interior", "imagen": "https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800", "cuidados": { "riego": "Reg", "luz": "Baja", "dificultad": "Fácil" } },
    { "id": 10, "nombre": "Árbol de Jade", "nombreCientifico": "Crassula ovata", "precio": 220, "categoria": "Suculenta", "imagen": "https://imgs.search.brave.com/yR9NQcZiakQB6tFhFsfkGP7zJz9lqsy9-goHBa0FH_s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzk0NDU5MC1NTEM3/NjI3NTY4OTM4OV8w/NTIwMjQtRS53ZWJw", "cuidados": { "riego": "Bajo", "luz": "Sol", "dificultad": "Fácil" } },
    { "id": 11, "nombre": "Aloe Vera", "nombreCientifico": "Aloe barbadensis", "precio": 180, "categoria": "Resistente", "imagen": "https://imgs.search.brave.com/bbd8JJ4BxqesOcgz1KJKd3zTzS96qceydOSeK4Wre3c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbG9l/cGx1c2xhbnphcm90/ZS5jb20vbWVkaWEv/ZW50cmFkYXMvdGlw/b3NfYWxvZV92ZXJh/LmpwZw", "cuidados": { "riego": "Bajo", "luz": "Luz D", "dificultad": "Fácil" } },
    { "id": 12, "nombre": "Zamioculca (ZZ)", "nombreCientifico": "Zamioculcas zamiifolia", "precio": 350, "categoria": "Resistente", "imagen": "https://imgs.search.brave.com/WcuX0jTS18Ee04j9aSRnQsXVL0FEZSneDV6F72rCW1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9qb21v/c3R1ZGlvLmNvbS9j/ZG4vc2hvcC9wcm9k/dWN0cy9aYW1pb2N1/bGNhc1phbWlpZm9s/aWE2bmIuanBnP3Y9/MTc2MjUyNTU2MSZ3/aWR0aD0xNjAw", "cuidados": { "riego": "Min", "luz": "Baja", "dificultad": "M. Fácil" } },
    { "id": 13, "nombre": "Cuna de Moisés", "nombreCientifico": "Spathiphyllum wallisii", "precio": 290, "categoria": "Humedad", "imagen": "https://imgs.search.brave.com/Fnzff8ZGpbYT2f0S1NgXICUMu2SfQLFwe28-B6JaJOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZXJj/YWRvamFtYWljYW9u/bGluZS5jb20vY2Ru/L3Nob3AvcHJvZHVj/dHMvQ3VuYURlTW9p/c2VzXzE0OGJjMzAw/LTBjY2UtNGEyNi1h/NjhkLTEyZWE3ZWRh/MDE4Mi5qcGc_dj0x/NjkxNDE0ODAxJndp/ZHRoPTE0NDU", "cuidados": { "riego": "Reg", "luz": "Som", "dificultad": "Fácil" } },
    { "id": 14, "nombre": "Drácena Marginata", "nombreCientifico": "Dracaena reflexa", "precio": 410, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/dmSrHrhbWnve88jf9FU9g1s-TnlM39IKHfaZbYr8flA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2xhcmluLmNvbS9p/bWcvMjAyMS8wNC8x/MS9aUi1NZmdpZkRf/NzIweDBfXzEuanBn", "cuidados": { "riego": "Mod", "luz": "Bril", "dificultad": "Fácil" } },
    { "id": 15, "nombre": "Croton", "nombreCientifico": "Codiaeum variegatum", "precio": 380, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/HtluqTyFgoNVnDjCw6RwqLZai0tYN9L6uOb00pMaxbI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92aXZh/bGFzcGxhbnRhcy5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjIvMDYvQ1JPVE9O/LUNISUNPLTIuanBn", "cuidados": { "riego": "Reg", "luz": "Much", "dificultad": "Media" } },
    { "id": 16, "nombre": "Peperomia", "nombreCientifico": "Peperomia obtusifolia", "precio": 160, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/cpFrXHBM6QlpXAo8SmlQtTqU0kGtnSeiyOEWdhgU2Ek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzkxODA0Ni1NTE05/Mzk1MDY5NTY0NF8x/MDIwMjUtRS53ZWJw", "cuidados": { "riego": "Mod", "luz": "Media", "dificultad": "Fácil" } },
    { "id": 17, "nombre": "Calathea Triostar", "nombreCientifico": "Stromanthe thalia", "precio": 450, "categoria": "Humedad", "imagen": "https://imgs.search.brave.com/sfESp2eekJpj5a9Mq0UvmpIEtkc9g0FpG1ovqUMWb6Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vb3NlenBs/YW50ZXJjYXBvdXNz/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTgvMTAvaW1n/XzE3MTEuanBnP3Jl/c2l6ZT0zMDI0LDQw/MzImc3NsPTE", "cuidados": { "riego": "Freq", "luz": "Media", "dificultad": "Media" } },
    { "id": 18, "nombre": "Cactus de Navidad", "nombreCientifico": "Schlumbergera", "precio": 230, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/Lun-Z70fv5yzujOHDmNDLj7PAY6UknoBCNJgBaOZGGQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmVsbXVlYmxl/LmNvbS9tZWRpby8y/MDI1LzExLzI0L2Nh/Y3R1cy1kZS1uYXZp/ZGFkX2Y3Y2U2MGMx/XzI1MTEyNDEzMTI1/N18xMDAweDEzMzMu/d2VicA", "cuidados": { "riego": "Mod", "luz": "Bril", "dificultad": "Media" } },
    { "id": 19, "nombre": "Hiedra Inglesa", "nombreCientifico": "Hedera helix", "precio": 210, "categoria": "Colgante", "imagen": "https://imgs.search.brave.com/0Yn4ZDkTkWGxulmbb7Z6_wXJb319ZIbHyg0_JJfurNo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFtcWV1SW5MZEwu/anBn", "cuidados": { "riego": "Mod", "luz": "Baja", "dificultad": "Fácil" } },
    { "id": 20, "nombre": "Maguey Morado", "nombreCientifico": "Tradescantia", "precio": 150, "categoria": "Resistente", "imagen": "https://imgs.search.brave.com/cZVKDLl_NSaLZzLBhtsv46hRdBIYC7sR8fJBXAh5cdw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzLzY0/LzQ5LzEzNjQ0OWYx/NmMxZjMzZjUyMmM4/MDQwMTUwOTExOGI2/LmpwZw", "cuidados": { "riego": "Bajo", "luz": "S/S", "dificultad": "M. Fácil" } },
    { "id": 21, "nombre": "Anturio Rojo", "nombreCientifico": "Anthurium", "precio": 420, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/YcUZQ6uVzzbfbfY5lNHUUqz-yfG5v4xoYR9uWTp9vQ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA0/MTEvNzM4MS8xMzUw/L2ZpbGVzL2FudGh1/cml1bV9yb2pvX2Fs/YmxhbmNfZmxvcl8x/OGRlNTEwNC05ZTVm/LTQ4NGUtOTVlMi1k/MTQzNTJjZjRiMjMu/anBnP3Y9MTY0NDg1/MDUwOQ", "cuidados": { "riego": "Reg", "luz": "Bril", "dificultad": "Media" } },
    { "id": 22, "nombre": "Begonia Maculata", "nombreCientifico": "Begonia maculata", "precio": 360, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/r0q1PFbQ_xyIWPTWMtbntXXZNp9UKYuG2k_6VCr82xo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NjE1OTEwMi9waG90/by9iZWdvbmlhLW1h/Y3VsYXRhLXBsYW50/LWluLXdoaXRlLXBv/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9c1lIV0l2Mzhi/QjVxTjBuS1RLSE96/M3Zib1NlV0VhTE5n/THdIT0V6Q3Qyaz0", "cuidados": { "riego": "Mod", "luz": "Media", "dificultad": "Media" } },
    { "id": 23, "nombre": "Rosa del Desierto", "nombreCientifico": "Adenium obesum", "precio": 450, "categoria": "Suculenta", "imagen": "https://imgs.search.brave.com/sffmhPen-6kK_g24d5Knu5ftYhdjN25_N_SCNSJ7k28/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZW1i/cmFtb3MuY29tLmNv/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIx/LzExL2FkZW5pdW0t/cGxhbnRhLXVuc3Bs/YXNoLTUzM3g4MDAu/anBn", "cuidados": { "riego": "Bajo", "luz": "Sol", "dificultad": "Media" } },
    { "id": 24, "nombre": "Cinta (Mala Madre)", "nombreCientifico": "Chlorophytum", "precio": 140, "categoria": "Colgante", "imagen": "https://imgs.search.brave.com/oTC7FaJwnPxYqOs-OekqnnqHMz2NrQMeNUKnFFPv0kU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGVwZXBs/YW50YXMuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzAz/L1doYXRzQXBwLUlt/YWdlLTIwMjQtMDMt/MjItYXQtNy4yMy41/MS1QTS0xLmpwZWc_/Zml0PTYwMCw4MDAm/c3NsPTE", "cuidados": { "riego": "Reg", "luz": "Media", "dificultad": "Fácil" } },
    { "id": 25, "nombre": "Nido de Ave", "nombreCientifico": "Asplenium nidus", "precio": 270, "categoria": "Humedad", "imagen": "https://imgs.search.brave.com/lX73ASWnMTFCFg8aDR-3NME4RZyoHeYjPcny24eSz5I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdml2b2JvcmVh/bC9pbWFnZXMvZl9h/dXRvLHFfYXV0by92/MTY1OTM3MDM2OC9Q/cm9kdWN0b3MlMjBU/aWVuZGElMjBvbmxp/bmUvUGxhbnRhcy9Q/bGFudGFzJTIwZGUl/MjBpbnRlcmlvci9B/c3BsZW5pdW0tTmlk/dXMtX0hlbGVjaG8t/QXZlLWxpc28tMl91/eWd3NTcvQXNwbGVu/aXVtLU5pZHVzLV9I/ZWxlY2hvLUF2ZS1s/aXNvLTJfdXlndzU3/LmpwZz9faT1BQQ", "cuidados": { "riego": "Freq", "luz": "Baja", "dificultad": "Fácil" } },
    { "id": 26, "nombre": "Orquídea Phalaenopsis", "nombreCientifico": "Phalaenopsis", "precio": 450, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/W-c0ILRN-dPxDkfL7zg971PyyRocupsnrrURdPzXiZQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92aXZv/Ym9yZWFsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8w/Ny9PcnF1aWRlYXMt/cGhhbGFlbm9wc2lz/LXZpdm8tYm9yZWFs/LTYuanBn", "cuidados": { "riego": "Bajo", "luz": "Med", "dificultad": "Media" } },
    { "id": 27, "nombre": "Senecio Rosario", "nombreCientifico": "Curio rowleyanus", "precio": 210, "categoria": "Colgante", "imagen": "https://imgs.search.brave.com/CJdK9YmjEVQau3nfF3Vgxd95_Tlyjd4BOOiFhtsubCI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jYWN0/dXNhbG1lcmF5YS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjUvMDMvU2VuZWNp/by1Sb3dsZXlhbnVz/LSVDMiVCNFBsYW50/YS1Sb3NhcmlvJUMy/JUI0LndlYnA", "cuidados": { "riego": "Min", "luz": "Bril", "dificultad": "Media" } },
    { "id": 28, "nombre": "Cactus Órgano", "nombreCientifico": "Pachycereus", "precio": 390, "categoria": "Exterior", "imagen": "https://imgs.search.brave.com/AEMFv8kEXO4zcSCHo77CIsX-QTjtJ05ZaSnoZ1BmF_I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/MzA5OTItTUxNNzY5/MDY5OTc5MzdfMDYy/MDI0LU8ud2VicA", "cuidados": { "riego": "Min", "luz": "Sol", "dificultad": "Fácil" } },
    { "id": 35, "nombre": "Bonsai Ficus", "nombreCientifico": "Ficus retusa", "precio": 450, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/YoCXjdPFw8ZLuJsZrpJMjC79yAWTU00OyL6hZvE_Y3c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE3/ODk0MzE4MC9waG90/by9ib25zYWktZmlj/dXMtZ2luc2VuZy1o/b3VzZS1wbGFudC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/UjJianhCalJDcldF/RnF2czZ4Ni1IcDZN/ZERzSG1sbVQzTE5K/WWE1OXZ3ST0", "cuidados": { "riego": "Mod", "luz": "Much", "dificultad": "Alta" } },
    { "id": 40, "nombre": "Eucalipto en Maceta", "nombreCientifico": "Eucalyptus gunnii", "precio": 380, "categoria": "Exterior", "imagen": "https://imgs.search.brave.com/iFkb_9ikpAYOIKmWeg9ojGxQg70vwahhaf3iaOztVwM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hZG1hZ2F6aW5l/LmNvbS9waG90b3Mv/NjFmMzNiMjgwODk3/NTE2MTdjZDJmZWFk/L21hc3Rlci93XzE2/MDAsY19saW1pdC9w/ZXhlbHMtZGFyaWEt/c2hldnRzb3ZhLTk3/MDA4OS5qcGc", "cuidados": { "riego": "Freq", "luz": "Sol", "dificultad": "Media" } }
];

export default function Marketplace() {
    const [busqueda, setBusqueda] = useState('');
    const [categoriaActiva, setCategoriaActiva] = useState('Todas');
    const [orden, setOrden] = useState('relevancia');
    const [notificacion, setNotificacion] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    const categorias = useMemo(() => {
        const set = new Set(plantasData.map(p => p.categoria));
        return ['Todas', ...Array.from(set)];
    }, []);

    const plantasFiltradas = useMemo(() => {
        let result = plantasData.filter(p => {
            const matchCat = categoriaActiva === 'Todas' || p.categoria === categoriaActiva;
            const matchBusq = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
            return matchCat && matchBusq;
        });

        if (orden === 'precio-asc') result.sort((a, b) => a.precio - b.precio);
        if (orden === 'precio-desc') result.sort((a, b) => b.precio - a.precio);
        return result;
    }, [busqueda, categoriaActiva, orden]);

    const agregarAlCarrito = (e: React.MouseEvent, planta: any) => {
        e.preventDefault();
        const saved = localStorage.getItem('donni-cart');
        const carrito = saved ? JSON.parse(saved) : [];
        const nuevo = [...carrito, { ...planta, instanceId: Date.now() + Math.random() }];
        localStorage.setItem('donni-cart', JSON.stringify(nuevo));
        window.dispatchEvent(new Event('storage'));
        
        setNotificacion(`${planta.nombre} añadido`);
        setTimeout(() => setNotificacion(null), 2500);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
            {notificacion && (
                <div className="fixed bottom-8 right-8 z-[100] bg-[#1a401f] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce border-l-4 border-[#D48960]">
                    <CheckCircle size={20} className="text-[#D48960]" />
                    <span className="font-bold uppercase text-[10px] tracking-widest">{notificacion}</span>
                </div>
            )}

            <main className="container mx-auto px-6 py-10">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h2 className="text-4xl font-black text-[#1a401f] font-serif tracking-tighter">Catálogo Consciente</h2>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                           <CheckCircle size={14} className="text-emerald-500" /> Sincronización biológica activa
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                                type="text"
                                placeholder="Buscar especie..."
                                className="bg-slate-50 border border-slate-100 py-4 pl-12 pr-6 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#1a401f]/10 w-full md:w-64 transition-all"
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                        <select 
                            className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-[#1a401f]/10 cursor-pointer tracking-widest"
                            onChange={(e) => setOrden(e.target.value)}
                        >
                            <option value="relevancia">Relevancia</option>
                            <option value="precio-asc">Precio: Bajo</option>
                            <option value="precio-desc">Precio: Alto</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-8 mb-4 scrollbar-hide">
                    <Filter size={18} className="text-slate-200 shrink-0 mr-2" />
                    {categorias.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaActiva(cat)}
                            className={`px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all border-2 shrink-0 ${categoriaActiva === cat
                                ? 'bg-[#1a401f] text-white border-[#1a401f] shadow-xl'
                                : 'bg-white text-slate-400 border-slate-100 hover:text-[#D48960] hover:border-[#D48960]/30'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {plantasFiltradas.map(p => (
                        <Link key={p.id} href={`/marketplace/${p.id}`} className="group bg-white rounded-[2.8rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-700 flex flex-col h-full hover:-translate-y-2">
                            <div className="relative h-80 overflow-hidden bg-slate-50">
                                <img 
                                    src={p.imagen} 
                                    alt={p.nombre}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    onError={(e) => {e.currentTarget.src = "https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg?auto=compress&cs=tinysrgb&w=800";}}
                                />
                                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black uppercase text-[#1a401f] shadow-sm tracking-widest">{p.categoria}</div>
                                <div className="absolute inset-0 bg-[#1a401f]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white text-[#1a401f] px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2">
                                       <Eye size={14} /> Analizar Ficha
                                    </div>
                                </div>
                            </div>

                            <div className="p-9 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-[#1a401f] font-serif leading-tight mb-1 group-hover:text-[#D48960] transition-colors">{p.nombre}</h3>
                                <p className="text-[10px] italic text-slate-400 mb-8 truncate">{p.nombreCientifico}</p>

                                <div className="grid grid-cols-3 gap-2 mb-8">
                                    <div className="bg-blue-50/50 p-2.5 rounded-xl flex flex-col items-center">
                                        <Droplets size={12} className="text-blue-500 mb-1" />
                                        <span className="text-[7px] font-black uppercase text-slate-400">Riego {p.cuidados.riego}</span>
                                    </div>
                                    <div className="bg-amber-50/50 p-2.5 rounded-xl flex flex-col items-center">
                                        <Sun size={12} className="text-amber-500 mb-1" />
                                        <span className="text-[7px] font-black uppercase text-slate-400">Luz {p.cuidados.luz}</span>
                                    </div>
                                    <div className="bg-emerald-50/50 p-2.5 rounded-xl flex flex-col items-center">
                                        <Activity size={12} className="text-emerald-500 mb-1" />
                                        <span className="text-[7px] font-black uppercase text-slate-400">{p.cuidados.dificultad}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Inversión</span>
                                        <span className="text-3xl font-black text-[#1a401f] tracking-tighter tabular-nums">${p.precio}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => agregarAlCarrito(e, p)}
                                        className="w-14 h-14 rounded-2xl bg-[#1a401f] text-white hover:bg-[#D48960] transition-all flex items-center justify-center shadow-lg active:scale-90"
                                    >
                                        <Plus size={24} />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}