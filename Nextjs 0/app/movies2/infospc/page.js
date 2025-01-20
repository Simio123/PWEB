"use client";
import useSWR from 'swr';

async function fetcher(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Falha ao buscar os dados');
        }
        const json = await res.json();
        return json;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

export default function LocationInfo() {
    
    const { data, error } = useSWR('https://extreme-ip-lookup.com/json/?key=I682FG5y0KrPKkT3kHch', fetcher);

    if (error) return <div>Falha na requisição...</div>;

    if (!data) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Informações de Localização</h1>
            <div>
                <strong>Nome do Negócio:</strong> {data.businessName || 'Não disponível'}
            </div>
            <div>
                <strong>Website do Negócio:</strong> <a href={data.businessWebsite || '#'} target="_blank" rel="noopener noreferrer">{data.businessWebsite || 'Não disponível'}</a>
            </div>
            <div>
                <strong>Cidade:</strong> {data.city || 'Não disponível'}
            </div>
            <div>
                <strong>Continente:</strong> {data.continent || 'Não disponível'}
            </div>
            <div>
                <strong>País:</strong> {data.country || 'Não disponível'}
            </div>
            <div>
                <strong>Código do País:</strong> {data.countryCode || 'Não disponível'}
            </div>
            <div>
                <strong>Nome do IP:</strong> {data.ipName || 'Não disponível'}
            </div>
            <div>
                <strong>Tipo de IP:</strong> {data.ipType || 'Não disponível'}
            </div>
            <div>
                <strong>Provedor de Internet (ISP):</strong> {data.isp || 'Não disponível'}
            </div>
            <div>
                <strong>Latitude:</strong> {data.lat || 'Não disponível'}
            </div>
            <div>
                <strong>Longitude:</strong> {data.lon || 'Não disponível'}
            </div>
            <div>
                <strong>Organização:</strong> {data.org || 'Não disponível'}
            </div>
            <div>
                <strong>Endereço IP:</strong> {data.query || 'Não disponível'}
            </div>
            <div>
                <strong>Região:</strong> {data.region || 'Não disponível'}
            </div>
            <div>
                <strong>Status:</strong> {data.status || 'Não disponível'}
            </div>
        </div>
    );
}
