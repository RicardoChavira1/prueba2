'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ShoppingCart,
    ChevronLeft,
    Star,
    Droplets,
    Sun,
    Truck,
    CheckCircle,
    Plus,
    Minus,
    Info,
    Loader2,
    BookOpen,
    Sprout,
    ShieldAlert,
    Wind,
    Dna,
    Thermometer, // Corrección: Añadido para que no de error
    Activity
} from 'lucide-react';

// --- BASE DE DATOS (Mantenida exactamente como la enviaste) ---
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
    { "id": 16, "nombre": "Peperomia", "nombreCientifico": "Peperomia obtusifolia", "precio": 160, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/cpFrXHBM6QlpXAo8SmlQtTqU0kGtnSeiyOEWdhgU2Ek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF_RX05QXzJY/XzkxODA0Ni1NTE05/Mzk1MDY5NTY0NF8x/MDIwMjUtRS53ZWJw", "cuidados": { "riego": "Mod", "luz": "Media", "dificultad": "Fácil" } },
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

export default function App() {
    const { id } = useParams();
    const router = useRouter();
    const [planta, setPlanta] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [carrito, setCarrito] = useState<any[]>([]);
    const [cantidad, setCantidad] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [notificacion, setNotificacion] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
        const p = plantasData.find(item => item.id === Number(id)) || plantasData[0];
        setPlanta(p);
        setLoading(false);

        const saved = localStorage.getItem('donni-cart');
        if (saved) {
            try { setCarrito(JSON.parse(saved)); } catch (e) { console.error(e); }
        }
    }, [id]);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('donni-cart', JSON.stringify(carrito));
            window.dispatchEvent(new Event('storage'));
        }
    }, [carrito, isMounted]);

    const getDificultadStyle = (nivel: string) => {
        if (nivel.includes('Muy Fácil')) return { color: 'text-emerald-500 bg-emerald-50', icon: <CheckCircle size={14} /> };
        if (nivel.includes('Fácil')) return { color: 'text-blue-500 bg-blue-50', icon: <Info size={14} /> };
        if (nivel.includes('Media')) return { color: 'text-amber-500 bg-amber-50', icon: <ShieldAlert size={14} /> };
        return { color: 'text-rose-500 bg-rose-50', icon: <ShieldAlert size={14} /> };
    };

    const agregarAlCarrito = () => {
        if (!planta) return;
        const nuevosItems = Array(cantidad).fill(null).map(() => ({
            ...planta,
            instanceId: Date.now() + Math.random()
        }));
        setCarrito(prev => [...prev, ...nuevosItems]);
        setNotificacion(`¡${cantidad} ${planta.nombre} añadido(s)!`);
        setTimeout(() => setNotificacion(null), 3000);
    };

    if (!isMounted) return <div className="min-h-screen bg-white" />;

    if (loading || !planta) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <Loader2 className="animate-spin text-[#1a401f]" size={48} />
            <p className="font-serif italic text-slate-400 text-lg animate-pulse text-center px-4">
                Sincronizando archivos biológicos de DONNI...
            </p>
        </div>
    );

    const difStyle = getDificultadStyle(planta.cuidados.dificultad);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-[#D48960]/30 pb-20">

            {notificacion && (
                <div className="fixed bottom-8 right-8 z-[100] bg-[#1a401f] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce border-l-4 border-[#D48960]">
                    <CheckCircle size={20} className="text-[#D48960]" />
                    <span className="font-medium">{notificacion}</span>
                </div>
            )}

            <div className="p-6">
                <button 
                  onClick={() => router.back()} 
                  className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-widest"
                >
                    <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Volver al Marketplace
                </button>
            </div>

            <main className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
                <div className="space-y-6">
                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl group relative">
                        <img
                            src={planta.imagen}
                            alt={planta.nombre}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            onError={(e) => { e.currentTarget.src = "https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg?auto=compress&cs=tinysrgb&w=800"; }}
                        />
                        {/* ETIQUETA VERDE RESTAURADA */}
                        <div className="absolute top-6 left-6">
                            <span className="bg-[#1a401f] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg backdrop-blur-md">
                                <Dna size={12} className="text-[#D48960]" /> {planta.categoria}
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#f3f7f3] p-8 rounded-[2rem] border border-[#1a401f]/5 shadow-sm">
                        <h4 className="flex items-center font-black text-[#1a401f] mb-6 gap-2 uppercase text-[10px] tracking-[0.3em]">
                            <Activity size={14} className="text-[#D48960]" /> Registro Biológico
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-[#1a401f]/10 pb-2">
                                <p className="text-slate-400 text-xs font-bold uppercase text-[10px]">Científico</p>
                                <p className="text-[#1a401f] italic font-serif text-sm font-medium">{planta.nombreCientifico}</p>
                            </div>
                            <div className="flex justify-between items-end border-b border-[#1a401f]/10 pb-2">
                                <p className="text-slate-400 text-xs font-bold uppercase text-[10px]">Humedad</p>
                                <p className="text-[#1a401f] font-medium text-sm">{planta.cuidados.humedad || 'Media'}</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <p className="text-slate-400 text-xs font-bold uppercase text-[10px]">Toxicidad</p>
                                <p className="text-[#1a401f] font-bold text-sm uppercase tracking-wider">{planta.cuidados.toxicidad || 'Tóxica'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col h-full">
                    <div className="mb-10">
                        <div className="flex items-center text-amber-400 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill="currentColor" />
                            ))}
                            <span className="text-[10px] font-black ml-3 text-slate-300 uppercase tracking-widest border-l border-slate-200 pl-3">Calidad Donni</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-[#1a401f] font-serif leading-none mb-6 tracking-tighter">
                            {planta.nombre}
                        </h1>
                        <p className="text-3xl font-black text-[#D48960] tracking-tighter mb-8">${planta.precio}</p>
                        <p className="text-slate-600 leading-relaxed font-medium mb-10">{planta.descripcion}</p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center bg-slate-50 p-2 rounded-2xl border border-slate-100 w-full sm:w-auto justify-between">
                                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="p-3 hover:bg-white rounded-xl transition-all shadow-sm"><Minus size={18} /></button>
                                <span className="w-12 text-center font-black text-2xl tabular-nums">{cantidad}</span>
                                <button onClick={() => setCantidad(cantidad + 1)} className="p-3 hover:bg-white rounded-xl transition-all shadow-sm"><Plus size={18} /></button>
                            </div>
                            <button
                                onClick={agregarAlCarrito}
                                className="grow w-full bg-[#1a401f] text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl hover:bg-[#265c2c] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <ShoppingCart size={22} /> Añadir al Carrito
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-12">
                        <div className="p-6 bg-slate-50 rounded-3xl flex flex-col items-center text-center group hover:bg-[#1a401f] transition-all">
                            <Droplets className="text-blue-500 mb-3 group-hover:text-white" size={24} />
                            <p className="text-[8px] font-black uppercase text-slate-400 mb-1 group-hover:text-white/40">Riego</p>
                            <p className="text-[10px] font-bold text-[#1a401f] group-hover:text-white uppercase">{planta.cuidados.riego}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl flex flex-col items-center text-center group hover:bg-[#1a401f] transition-all">
                            <Sun className="text-amber-500 mb-3 group-hover:text-white" size={24} />
                            <p className="text-[8px] font-black uppercase text-slate-400 mb-1 group-hover:text-white/40">Luz</p>
                            <p className="text-[10px] font-bold text-[#1a401f] group-hover:text-white uppercase">{planta.cuidados.luz}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl flex flex-col items-center text-center group hover:bg-[#1a401f] transition-all">
                            <Thermometer className="text-emerald-500 mb-3 group-hover:text-white" size={24} />
                            <p className="text-[8px] font-black uppercase text-slate-400 mb-1 group-hover:text-white/40">Ambiente</p>
                            <p className="text-[10px] font-bold text-[#1a401f] group-hover:text-white uppercase">{planta.cuidados.dificultad}</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-full mt-24 pt-24 border-t border-slate-100">
                    <div className="max-w-4xl mb-16">
                        <h3 className="text-4xl font-black text-[#1a401f] mb-4 font-serif">Protocolo de Cuidado Wiki-DONNI</h3>
                        <p className="text-slate-400 font-medium italic">Instrucciones precisas para que tu {planta.nombre} prospere en casa.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="group p-8 rounded-3xl border border-transparent hover:border-slate-50 transition-all">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <Droplets size={32} />
                            </div>
                            <h4 className="font-bold text-2xl text-[#1a401f] mb-4">Hidratación</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                Esta planta requiere un régimen de riego <strong>{planta.cuidados.riego}</strong>. Es vital mantener el sustrato según estas especificaciones para asegurar la salud de las raíces.
                            </p>
                        </div>

                        <div className="group p-8 rounded-3xl border border-transparent hover:border-slate-50 transition-all">
                            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <Sun size={32} />
                            </div>
                            <h4 className="font-bold text-2xl text-[#1a401f] mb-4">Luminosidad</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                Su necesidad de <strong>{planta.cuidados.luz}</strong> es fundamental para su crecimiento. Ubícala en un lugar que respete este parámetro para asegurar hojas vibrantes.
                            </p>
                        </div>

                        <div className="group p-8 rounded-3xl border border-transparent hover:border-slate-50 transition-all">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <Wind size={32} />
                            </div>
                            <h4 className="font-bold text-2xl text-[#1a401f] mb-4">Mantenimiento</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                Nivel de dificultad: <strong>{planta.cuidados.dificultad}</strong>. {planta.cuidados.dificultad.includes('Fácil') ? 'Ideal para personas sin experiencia previa.' : 'Requiere un monitoreo más atento de su entorno biológico.'}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 py-12 border-t border-slate-100 text-center">
                 <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">Donni conscious botanics © {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}