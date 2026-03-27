import {
  Box,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseIcon from '@mui/icons-material/Close'
import { useGetUserCartsByIdQuery } from '../../apis/getUserDetails'
import type { UserCartsPanelProps } from '../../types/UserCart'

export default function UserCartsPanel({ userId, enabled, onClose }: UserCartsPanelProps) {
  const { data, isLoading, isError } = useGetUserCartsByIdQuery(userId, { skip: !enabled })

  return (
    <Box
      sx={{
        width: 340,
        background: 'rgba(10,5,25,0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(167,139,250,0.2)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(90vh / 2.5)',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingCartIcon sx={{ color: '#a78bfa', fontSize: '1rem' }} />
          <Typography sx={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>
            Cart Items
          </Typography>
          {data && (
            <Chip
              label={data.carts.reduce((acc, c) => acc + c.totalQuantity, 0)}
              size="small"
              sx={{ height: 18, fontSize: '0.65rem', background: 'rgba(167,139,250,0.2)', color: '#a78bfa' }}
            />
          )}
        </Box>
        <IconButton size="small" onClick={onClose}
          sx={{ color: 'rgba(255,255,255,0.5)', p: 0.5, '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.1)' } }}>
          <CloseIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(167,139,250,0.15)', flexShrink: 0 }} />

      {/* Content */}
      <Box sx={{ overflowY: 'auto', flex: 1, px: 2, py: 1.5,
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(167,139,250,0.3)', borderRadius: 2 },
      }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} sx={{ color: '#a78bfa' }} />
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ borderRadius: 2, fontSize: '0.75rem' }}>
            Failed to load carts.
          </Alert>
        )}

        {data && data.carts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <ShoppingCartIcon sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '2rem' }} />
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', mt: 1 }}>No carts found</Typography>
          </Box>
        )}

        {data && data.carts.map((cart, cartIdx) => (
          <Box key={cart.id} sx={{ mb: cartIdx < data.carts.length - 1 ? 2 : 0 }}>
            {/* Cart summary */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Cart #{cart.id} · {cart.totalProducts} item{cart.totalProducts !== 1 ? 's' : ''}
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', textDecoration: 'line-through' }}>
                  ${cart.total.toFixed(2)}
                </Typography>
                <Typography sx={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 700 }}>
                  ${cart.discountedTotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Products */}
            {cart.products.map((product) => (
              <Box key={product.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 1 }}>
                <Avatar
                  src={product.thumbnail}
                  alt={product.title}
                  variant="rounded"
                  sx={{ width: 40, height: 40, borderRadius: '8px', flexShrink: 0, border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ color: '#e2e8f0', fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.3,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem', mt: 0.3 }}>
                    {product.quantity} × ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                  ${product.discountedTotal.toFixed(2)}
                </Typography>
              </Box>
            ))}

            {cartIdx < data.carts.length - 1 && (
              <Divider sx={{ mt: 1.5, borderColor: 'rgba(167,139,250,0.1)' }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
