import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
    const logoData = readFileSync(join(process.cwd(), 'public', 'logo.png'));
    const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img src={logoBase64} width="80%" style={{ objectFit: 'contain' }} />
            </div>
        ),
        { ...size }
    );
}
